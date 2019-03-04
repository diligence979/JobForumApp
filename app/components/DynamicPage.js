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
import postActions from '../store/actions/post'
import PostItem from './widget/post/PostItem'
import PullListView from './widget/PullLoadMoreListView'
import { ActionUtils } from '../utils/postUtil'


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
            <PostItem
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
        let { postAction }= this.props 
        this.page = 0 
        postAction.getPostReceived(0, (res) => {
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
        let { postAction } = this.props 
        postAction.getPostReceived(this.page, (res) => {
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.loadMoreComplete((res && (res.count-this.page*30) >= 0)) 
                }
            }, 300) 
        })
        this.page++
    }


    render() {
        let { postState } = this.props 
        let dataSource = (postState.received_posts_data_list) 
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
    postState: state.post,
}), dispatch => ({
    loginAction: bindActionCreators(loginActions, dispatch),
    userAction: bindActionCreators(userActions, dispatch),
    postAction: bindActionCreators(postActions, dispatch)
}))(DynamicPage)