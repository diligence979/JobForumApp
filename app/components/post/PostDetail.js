import React, { Component } from 'react'
import {
    View,
    AppState, 
    InteractionManager,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import commentAction from '../../store/actions/comment'
import PullListView from '../widget/PullLoadMoreListView'
import PostDetailItem from './PostDetailItem'
import CommentItem from '../comment/CommentItem'
import * as Constant from '../../style/constant'
import styles, { screenWidth, screenHeight } from '../../style'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import Toast from '../common/ToastProxy'

class PostDetail extends Component {
    constructor(props) {
        super(props)
        this._renderRow = this._renderRow.bind(this)
        this._renderHeader = this._renderHeader.bind(this);
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

    _renderRow(rowData, index, ownerId) {
        let { id, user, hr, content, created_at } = rowData
        let username = ''
        let userId = null
        let avatar = null
        if (user) {
            username = user.username
            userId = user.id
            avatar = user.avatar
        } else if (hr) {
            username = hr.username
            userId = hr.id
            avatar = hr.avatar
        }
        return (
            <CommentItem
                ownerId={ownerId}
                userId={userId}
                username={username}
                content={content}
                created_at={created_at}
                avatar={avatar}
                deleteComment={() => {
                    this._deleteComment(ownerId, id)
                }}
            />
        )
    }

    _deleteComment(ownerId, id) {
        let role = this.props.ownerInfo.role
        let { commentAction } = this.props
        if (role) {
            // HR
            commentAction.deleteCommentByHr(ownerId, id, (res) => {
                if (res) {
                    Toast('删除成功')
                } else {
                    Toast('删除失败')
                }
            })
        } else {
            // 求职者
            commentAction.deleteCommentByUser(ownerId, id, (res) => {
                if (res) {
                    Toast('删除成功')
                } else {
                    Toast('删除失败')
                }
            })
        }
    }

    _renderHeader(postInfo) {
        let { user, title, content, created_at, comment_size, avatar } = postInfo
        return (
            <PostDetailItem 
                user={user}
                count={comment_size}
                title={title}
                content={content} 
                created_at={created_at}
                avatar={avatar}
            />
        )
    }

    _refresh() {
        let { commentAction, type, id }= this.props 
        this.page = 0 
        commentAction.getCommentReceived(0, type, id, (res) => {
            this.page++
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.refreshComplete((res && (res.count-this.page*30) >= 0)) 
                }
            }, 500) 
        })
    }

    _loadMore() {
        let { commentAction, type, id } = this.props 
        commentAction.getCommentReceived(this.page, type, id, (res) => {
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.loadMoreComplete((res && (res.count-this.page*30) >= 0)) 
                }
            }, 300) 
        }) 
        this.page++
    }

    _createComment(ownerId, role, text, title = null, postId) {
        Actions.LoadingModal({backExit: false})
        commentAction.createPostComment(text, ownerId, role, postId).then((res) => {
            setTimeout(() => {
                Actions.pop()
            }, 500)
        })
    }

    render() {
        let btnStyle = [{backgroundColor: Constant.transparentColor}]
        let { commentState, postInfo, ownerInfo } = this.props
        let role = ownerInfo.role
        let ownerId = ownerInfo.ownerId
        let postId = postInfo.id
        let dataSource = (commentState.received_comments_data_list)
        return (
            <View style={[styles.shadowCard, {
                flex: 1,
                backgroundColor: Constant.cardBackgroundColor,
                marginTop: Constant.normalMarginEdge / 2,
                marginLeft: Constant.normalMarginEdge,
                marginRight: Constant.normalMarginEdge,
                padding: Constant.normalMarginEdge,
                }]}>
                <PullListView
                    style={{flex: 1}}
                    ref="pullList"
                    renderHeader={this._renderHeader(postInfo)}
                    renderRow={(rowData, index, ownerId) =>
                        this._renderRow(rowData, index, ownerId)
                    }
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={dataSource}
                    ownerId={ownerId}
                />
                <TouchableOpacity
                    style={[{
                        position: "absolute",
                        left: screenWidth - 80,
                        top: screenHeight - 200,
                        right: 0,
                        bottom: 0,
                        zIndex: 222,
                    }]}
                    onPress={() => {
                        Actions.TextInputModal({
                            textConfirm: this._createComment,
                            titleText: "发表评论",
                            needEditTitle: false,
                            text: "",
                            titleValue: "",
                            bottomBar: true,
                            placeHolder: '请输入评论内容',
                            ownerId: ownerId,
                            essayId: postId,
                            role: role
                        })
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

PostDetail.propTypes = {
    type: PropTypes.string,
    id: PropTypes.number,
    ownerInfo: PropTypes.object
}

export default connect(state => ({
    commentState: state.comment,
}), dispatch => ({
    commentAction: bindActionCreators(commentAction, dispatch)
}))(PostDetail)