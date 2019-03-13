import React, { Component } from 'react'
import {
    View,
    AppState, 
    StatusBar,
    TouchableOpacity,
    InteractionManager,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card, ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import styles, { screenWidth, screenHeight } from '../style'
import { Actions } from 'react-native-router-flux'
import * as Constant from '../style/constant'
import loginActions from '../store/actions/login'
import ownerActions from '../store/actions/owner'
import adActions from '../store/actions/ad'
import AdItem from './ad/AdItem'
import Toast from './widget/ToastProxy'
import PullListView from './widget/PullLoadMoreListView'
import HotList from './widget/HotList'
import { adUtil } from '../utils/actionUtil'

/**
 * 推荐页 -> 招聘贴广场
 *
 * @class TrendPage
 * @extends {Component}
 */
class TrendPage extends Component {
    constructor(props) {
        // props 来自高阶组件 connect
        super(props)
        this._renderRow = this._renderRow.bind(this)
        this._renderHeader = this._renderHeader.bind(this)
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
        let { company, created_at, job, location, salary, education, comment_size } = rowData
        return (
            <AdItem
                company={company}
                created_at={created_at}
                job={job}
                location={location}
                salary={salary}
                education={education}
                comment_size={comment_size}
                onPressItem={() => {
                    adUtil(rowData)
                }}
            />
        )
    }

    _renderHeader(hotAds) {
        return (
            <HotList 
                hotList={hotAds}
                isPost={false}
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
            this.page++
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.refreshComplete((res && (res.count-this.page*30) >= 0)) 
                }
            }, 500) 
        })
        adAction.getPopularAd((res) => {
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
        adAction.getPopularAd((res) => {
        })
    }

    _createAd(refresh, ownerId, role, text, title, essayId, company, job, education, team, location, salay, email) {
        Actions.LoadingModal({backExit: false})
        adActions.createAd(ownerId, company, job, education,  team, location, salay, email, text).then((res) => {
            setTimeout(() => {
                Actions.pop()
                refresh()
            }, 500)
        })
    }


    render() {
        let btnStyle = [{backgroundColor: Constant.transparentColor}]
        let { adState } = this.props 
        let dataSource = (adState.received_ads_data_list)
        let hotAds = adState.received_popular_ads_data_list
        let ownerInfo = this.props.ownerState.ownerInfo
        let ownerId = ownerInfo.ownerId
        let role = ownerInfo.role
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
                    renderHeader={this._renderHeader(hotAds)}
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={dataSource}
                />
                <TouchableOpacity
                    style={[{
                        position: "absolute",
                        left: screenWidth - 60,
                        top: screenHeight - 250,
                        right: 0,
                        bottom: 0,
                        zIndex: 222,
                    }]}
                    onPress={() => {
                        if (role) {
                            Actions.TextInputModal({
                                textConfirm: this._createAd,
                                titleText: "创建招聘信息",
                                needEditTitle: false,
                                needEditAd: true,
                                text: "",
                                titleValue: "",
                                bottomBar: true,
                                placeHolder: "岗位描述",
                                ownerId: ownerId,
                                role: role,
                                refresh: this._refresh
                            })
                        } else {
                            Toast('求职者不能发招聘信息哦～') 
                        }
                    }}>
                    <View
                        style={[styles.centered, ...btnStyle]}>
                        <Icon name={'md-add-circle'}
                              style={{backgroundColor: Constant.transparentColor}}
                              backgroundColor={Constant.transparentColor}
                              size={50} color={Constant.primaryColor}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(state => ({
    ownerState: state.owner,
    loginState: state.login,
    adState: state.ad,
}), dispatch => ({
    loginAction: bindActionCreators(loginActions, dispatch),
    ownerAction: bindActionCreators(ownerActions, dispatch),
    adAction: bindActionCreators(adActions, dispatch)
}))(TrendPage)