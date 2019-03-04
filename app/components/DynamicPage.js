import React, { Component } from 'react'
import {
    View,
    AppState, 
    StatusBar, 
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from "../style"
import loginActions from '../store/actions/login'
import userActions from '../store/actions/user'
import eventActions from '../store/actions/event'
import EventItem from './widget/EventItem'
import PullListView from './widget/PullLoadMoreListView'
import { ActionUtils } from '../utils/eventUtil'


/**
 * 动态 -> 论坛广场，论坛动态
 */
class DynamicPage extends Component {
    constructor(props) {
        // props 来自高阶组件 connect
        super(props)
        this._renderRow = this._renderRow.bind(this)
        this._refresh = this._refresh.bind(this)
        this._loadMore = this._loadMore.bind(this)
        this._handleAppStateChange = this._handleAppStateChange.bind(this)
        this.startRefresh = this.startRefresh.bind(this)
        this.page = 0
        this.appState = 'active'
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.startRefresh()
        })
        AppState.addEventListener('change', this._handleAppStateChange) 
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange) 
    }

    startRefresh() {
        if (this.refs.pullList)
            this.refs.pullList.showRefreshState() 
        this._refresh() 
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
            if (this.refs.pullList)
                this.refs.pullList.scrollToTop() 
            this.startRefresh() 
        }
        this.appState = nextAppState 
    } 

    _renderRow(rowData) {
        let { user, title, comment_size, created_at } = rowData
        return (
            <EventItem
                actionTime={created_at}
                onPressItem={() => {
                    ActionUtils(rowData)
                }}
                actionUser={user.username}
                actionTarget={title}
                actionComment={comment_size}
            />
        )
    }

    /**
     * 刷新
     * */
    _refresh() {
        let { eventAction }= this.props 
        this.page = 0 
        eventAction.getEventReceived(0, (res) => {
            this.page++
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.refreshComplete((res && (res.count-this.page*30) >= 0)) 
                }
            }, 500) 
        })
    }

    /**
     * 加载更多
     * */
    _loadMore() {
        let { eventAction } = this.props 
        eventAction.getEventReceived(this.page, (res) => {
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.loadMoreComplete((res && (res.count-this.page*30) >= 0)) 
                }
            }, 300) 
        })
        this.page++
    }


    render() {
        let { eventState } = this.props 
        let dataSource = (eventState.received_events_data_list) 
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} 
                           backgroundColor={'transparent'} 
                           translucent 
                           barStyle={'light-content'}/>
                <PullListView
                    style={{flex: 1}}
                    ref="pullList"
                    renderRow={(rowData, index) =>
                        this._renderRow(rowData)
                    }
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={dataSource}
                />
            </View>
        )
    }
}

export default connect(state => ({
    userState: state.user,
    loginState: state.login,
    eventState: state.event,
}), dispatch => ({
    loginAction: bindActionCreators(loginActions, dispatch),
    userAction: bindActionCreators(userActions, dispatch),
    eventAction: bindActionCreators(eventActions, dispatch)
}))(DynamicPage)