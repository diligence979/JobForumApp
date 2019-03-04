import React, { Component } from 'react'
import {
    View,
    StatusBar
} from 'react-native'
import PropTypes from 'prop-types'
import PostDetail from './widget/PostDetail'
import styles from '../style'

class PostDetailPage extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        let { rowData } = this.props
        let { id } = rowData
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} 
                           backgroundColor={'transparent'} 
                           translucent 
                           barStyle={'light-content'}/>
                <PostDetail 
                    type={'post'}
                    id={id}
                    postInfo={rowData}
                />
            </View>
        )
    }
}

PostDetailPage.propTypes = {
    rowData: PropTypes.object
}

export default PostDetailPage