import React, { Component } from 'react'
import {
    View,
    StatusBar
} from 'react-native'
import PropTypes from 'prop-types'
import PostItem from './widget/PostItem'
import CommentList from './widget/CommentList'
import * as Constant from '../style/constant'
import styles from '../style'

class PostDetailPage extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        let { rowData } = this.props
        let { id, user, title, content, created_at } = rowData
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} 
                           backgroundColor={'transparent'} 
                           translucent 
                           barStyle={'light-content'}/>
                <PostItem 
                    user={user}
                    title={title}
                    content={content} 
                    created_at={created_at}
                />
                <CommentList 
                    type={'post'}
                    id={id}
                />
            </View>
        )
    }
}

PostDetailPage.propTypes = {
    rowData: PropTypes.object
}

export default PostDetailPage