import React, { Component } from 'react'
import {
    View,
    AppState, 
    StatusBar,
    Text,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from "../style"
import loginActions from '../store/actions/login'
import userActions from '../store/actions/user'
import adActions from '../store/actions/ad'
import AdItem from './widget/ad/AdItem'
import PullListView from './widget/PullLoadMoreListView'
import { ActionUtils } from '../utils/postUtil'


/**
 * 推荐 -> 招聘广场，招聘动态
 */
class TrendPage extends Component {
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
        console.log(rowData)
        let { company, created_at, job, location, salary, education } = rowData
        return (
            <AdItem 
                company={company}
                created_at={created_at}
                job={job}
                location={location}
                salary={salary}
                education={education}
            />
        )
    }

    /**
     * 刷新
     * */
    _refresh() {
        let { adAction }= this.props 
        this.page = 0 
        adAction.getAdReceived(0, (res) => {
            console.log(res)
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
        let { adAction } = this.props 
        adAction.getAdReceived(this.page, (res) => {
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.loadMoreComplete((res && (res.count-this.page*30) >= 0)) 
                }
            }, 300) 
        })
        this.page++
    }


    render() {
        let { adState } = this.props 
        let dataSource = (adState.received_ads_data_list) 
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
    adState: state.ad,
}), dispatch => ({
    loginAction: bindActionCreators(loginActions, dispatch),
    userAction: bindActionCreators(userActions, dispatch),
    adAction: bindActionCreators(adActions, dispatch)
}))(TrendPage)