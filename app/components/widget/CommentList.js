import React, { Component } from 'react'
import {
    View,
    AppState, 
    Text,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'
import commentAction from '../../store/actions/comment'
import PullListView from './PullLoadMoreListView'
import CommentItem from './CommentItem'
import * as Constant from '../../style/constant'
import styles from '../../style'

class CommentList extends Component {
    constructor(props) {
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
        let { user, content, created_at } = rowData
        return (
            <CommentItem 
                username={user.username}
                content={content}
                created_at={created_at}
            />
        )
    }

    _refresh() {
        let { commentAction, type, id }= this.props 
        this.page = 0 
        commentAction.getCommentReceived(0, type, id, (res) => {
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.refreshComplete((res && (res.count-this.page*30) >= 0)) 
                }
            }, 500) 
        })
    }

    _loadMore() {
        let { commentAction, type, id } = this.props 
        this.page++ 
        commentAction.getCommentReceived(this.page, type, id, (res) => {
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.loadMoreComplete((res && (res.count-this.page*30) >= 0)) 
                }
            }, 300) 
        }) 
    }

    render() {
        let { commentState } = this.props
        let dataSource = (commentState.received_comments_data_list)
        let count = (commentState.received_comments_current_size)
        console.log(count)
        return (
            <View style={[{
                flex: 1,
                marginTop: Constant.normalMarginEdge / 2,
                marginLeft: Constant.normalMarginEdge,
                marginRight: Constant.normalMarginEdge,
                padding: Constant.normalMarginEdge,
                borderRadius: 4,
                }, styles.shadowCard]}>
                <View style={[styles.flexDirectionRowNotFlex]}>
                    <Text style={[styles.subSmallText, {
                        fontSize: 12,
                    }]}>
                        {count}条评论
                        <Icon name="chevrons-down" size={16} color="#959595" />
                    </Text>
                </View>
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

CommentList.propTypes = {
    type: PropTypes.string,
    id: PropTypes.number
}

export default connect(state => ({
    commentState: state.comment,
}), dispatch => ({
    commentAction: bindActionCreators(commentAction, dispatch)
}))(CommentList)