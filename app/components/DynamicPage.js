import React, { Component } from 'react'
import {
    View,
    Text,
    AppState, 
    StatusBar, 
    InteractionManager,
    TouchableOpacity
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
import postActions from '../store/actions/post'
import PostItem from './widget/post/PostItem'
import Toast from './common/ToastProxy'
import PullListView from './widget/PullLoadMoreListView'
import { postUtil } from '../utils/ActionUtil'


/**
 * 动态 -> 论坛广场，论坛动态
 */
class DynamicPage extends Component {
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
        let { user, title, comment_size, created_at } = rowData
        return (
            <PostItem
                actionTime={created_at}
                actionUser={user.username}
                actionTarget={title}
                actionComment={comment_size}
                onPressItem={() => {
                    postUtil(rowData)
                }}
            />
        )
    }

    _renderHeader(hotPosts) {
        return (
            <Card title="热门帖子"
                containerStyle={{
                    borderWidth: 0,
                    marginTop: Constant.normalMarginEdge / 2,
                    marginLeft: Constant.normalMarginEdge,
                    marginRight: Constant.normalMarginEdge,
                    marginBottom: Constant.normalMarginEdge / 2,
                    padding: Constant.normalMarginEdge,
                }}
                dividerStyle={{
                    display: "none"
                }}
            >
              {
                hotPosts.map((u, i) => {
                  return (
                    <ListItem
                        key={i}
                        roundAvatar
                        bottomDivider
                        title={u.content}
                        chevron
                        chevronColor="white"
                        titleStyle={{
                            fontSize: 14,
                            maxHeight: 16
                        }}
                        subtitleStyle={{
                            fontSize:12,
                            color: "#959595"
                        }}
                        subtitle={u.user.username}
                        containerStyle={[{
                            flexWrap: "nowrap",
                            padding: 5
                        }]}
                        badge={{value: `${u.comment_size}`, badgeStyle:{
                            backgroundColor: "#fe180d"
                        }}}
                        onPress={() => {
                            postUtil(u)
                        }}
                        //avatar={{uri:u.avatar}}
                    />
                  )
                })
              }
            </Card>
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
        postAction.getPopularPost((res) => {
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
        postAction.getPopularPost((res) => {
        })
    }

    _createPost(ownerId, role, text, title) {
        Actions.LoadingModal({backExit: false})
        postActions.createPost(title, text, ownerId).then((res) => {
            setTimeout(() => {
                Actions.pop()
            }, 500)
        })
    }


    render() {
        let btnStyle = [{backgroundColor: Constant.transparentColor}]
        let { postState } = this.props 
        let dataSource = postState.received_posts_data_list
        let hotPosts = postState.received_popular_posts_data_list
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
                    renderHeader={this._renderHeader(hotPosts)}
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
                        if (!role) {
                            Actions.TextInputModal({
                                textConfirm: this._createPost,
                                titleText: "创建帖子",
                                needEditTitle: true,
                                text: "",
                                titleValue: "",
                                bottomBar: true,
                                placeHolderTitle: "请输入帖子标题",
                                placeHolder: "请输入帖子内容",
                                ownerId: ownerId,
                                role: role
                            })
                        } else {
                            Toast('Hr不能发帖子哦～') 
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
    postState: state.post,
}), dispatch => ({
    loginAction: bindActionCreators(loginActions, dispatch),
    ownerAction: bindActionCreators(ownerActions, dispatch),
    postAction: bindActionCreators(postActions, dispatch)
}))(DynamicPage)