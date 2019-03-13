import React, { Component } from 'react'
import {
    View,
    StatusBar,
    AppState,
    InteractionManager
} from 'react-native'
import UserDetailItem from './UserDetailItem'
import PostItem from '../post/PostItem'
import AdItem from '../ad/AdItem'
import PullListView from '../widget/PullLoadMoreListView'
import styles from '../../style'
import { postUtil, adUtil } from '../../utils/actionUtil'
import Toast from '../widget/ToastProxy'



/**
 * 用户显示基础控件
 */
class BasePersonPage extends Component {
    constructor(props) {
        super(props)
        this._renderHeader = this._renderHeader.bind(this)
        this._refresh = this._refresh.bind(this)
        this._renderPostRow = this._renderPostRow.bind(this)
        this._renderAdRow = this._renderAdRow.bind(this)
        this._loadMore = this._loadMore.bind(this)
        this._handleAppStateChange = this._handleAppStateChange.bind(this)
        this.startRefresh = this.startRefresh.bind(this)
        this.page = 0
        this.appState = 'active'
        this.state = {
            dataSource: [],
        }
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

    _renderHeader(ownerInfo) {
        return (
            <View>
                <UserDetailItem 
                    ownerInfo={ownerInfo}
                    refresh={this._refresh}
                />
            </View>
        )
    }

    /**
     * 刷新
     * */
    _refresh() {
        let ownerInfo = this.props.ownerState.ownerInfo
        let { role, ownerId }  = ownerInfo
        let { postAction, adAction }= this.props 
        this.page = 0

        if (role) {
            adAction.getAdByHr(ownerId, 0, (res) => {
                this.page++
                setTimeout(() => {
                    if (this.refs.pullList) {
                        this.refs.pullList.refreshComplete((res && (res.count-this.page*30) >= 0)) 
                    }
                }, 500) 
            })
        } else {
            postAction.getPostByUser(ownerId, 0, (res) => {
                this.page++
                setTimeout(() => {
                    if (this.refs.pullList) {
                        this.refs.pullList.refreshComplete((res && (res.count-this.page*30) >= 0)) 
                    }
                }, 500) 
            })
        }
    }

    /**
     * 加载更多
     * */
    _loadMore() {
        let ownerInfo = this.props.ownerState.ownerInfo
        let { role, ownerId }  = ownerInfo
        let { postAction, adAction }= this.props 

        if (role) {
            adAction.getAdByHr(ownerId, this.page, (res) => {
                setTimeout(() => {
                    if (this.refs.pullList) {
                        this.refs.pullList.refreshComplete((res && (res.count-this.page*30) >= 0)) 
                    }
                }, 500) 
            })
            this.page++
        } else {
            postAction.getPostByUser(ownerId, this.page, (res) => {
                setTimeout(() => {
                    if (this.refs.pullList) {
                        this.refs.pullList.refreshComplete((res && (res.count-this.page*30) >= 0)) 
                    }
                }, 500) 
            })
            this.page++
        }
    }

    _renderPostRow(rowData) {
        let { id, user, title, created_at } = rowData
        let userId = user.id
        let postId = id
        return (
            <View>
                <PostItem
                    actionTime={created_at}
                    actionUser={user.username}
                    actionTarget={title}
                    actionAvatar={user.avatar}
                    showDelete
                    onPressItem={() => {
                        postUtil(rowData)
                    }}
                    deleteItem={() => {
                        this._deletePost(userId, postId)
                    }}
                />
            </View>
        )
    }

    _renderAdRow(rowData) {
        let { id, hr, company, created_at, job, location, salary, education } = rowData
        let hrId = hr.id
        let adId = id
        return (
            <View>
                <AdItem
                    company={company}
                    created_at={created_at}
                    job={job}
                    location={location}
                    salary={salary}
                    education={education}
                    showDelete
                    onPressItem={() => {
                        adUtil(rowData)
                    }}
                    deleteItem={() => {
                        this._deleteAd(hrId, adId)
                    }}
                />
            </View>
        )
    }

    _deletePost(userId, postId) {
        let { postAction }= this.props
        postAction.deletePost(userId, postId, (res) => {
            if (res) {
                Toast('删除成功')
            } else {
                Toast('删除失败')
            }
        })
    }

    _deleteAd(hrId, adId) {
        let { adAction }= this.props
        adAction.deleteAd(hrId, adId, (res) => {
            if (res) {
                Toast('删除成功')
            } else {
                Toast('删除失败')
            }
        })
    }

    render() {
        let ownerInfo = this.props.ownerState.ownerInfo
        let { role } = ownerInfo
        let dataPostSource = this.props.postState.received_user_posts_data_list
        let dataAdSource = this.props.adState.received_user_ads_data_list
        let pullListView = role ? 
                <PullListView
                    style={{flex: 1}}
                    ref="pullList"
                    renderHeader={this._renderHeader(ownerInfo)}
                    renderRow={(rowData, index) =>
                        this._renderAdRow(rowData)
                    }
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={dataAdSource}
                /> :
                <PullListView
                    style={{flex: 1}}
                    ref="pullList"
                    renderHeader={this._renderHeader(ownerInfo)}
                    renderRow={(rowData, index) =>
                        this._renderPostRow(rowData)
                    }
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={dataPostSource}
                />
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
                {pullListView}
            </View>
        )
    }
}

export default BasePersonPage