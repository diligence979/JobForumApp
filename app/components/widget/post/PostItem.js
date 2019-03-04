import React, { Component } from 'react'
import {
    View, 
    Text, 
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import styles from '../../../style'
import * as Constant from '../../../style/constant'
import TimeText from '../TimeText'
import UserImage from '../UserImage'
import Icon from 'react-native-vector-icons/Feather'

/**
 * 帖子列表
 */
class PostItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { actionTime, actionUser, actionUserPic, actionComment, actionTarget } = this.props
        let pic = (actionUserPic) ? <UserImage uri={actionUserPic}
                                               loginUser={actionUser}
                                               resizeMethod="scale"
                                               style={[{
                                                   height: Constant.smallIconSize, width: Constant.smallIconSize,
                                                   marginTop: 5,
                                                   marginRight: Constant.normalMarginEdge / 2,
                                                   borderRadius: Constant.smallIconSize / 2
                                               }]}/> : <View/>
        return (
            <TouchableOpacity
                style={[{
                    marginTop: Constant.normalMarginEdge / 2,
                    marginLeft: Constant.normalMarginEdge,
                    marginRight: Constant.normalMarginEdge,
                    marginBottom: Constant.normalMarginEdge / 2,
                    padding: Constant.normalMarginEdge,
                    borderRadius: 4,
                }, styles.shadowCard]}
                onPress={() => {
                    this.props.onPressItem && this.props.onPressItem()
                }}
            >
                <View style={[styles.flexDirectionRowNotFlex]}>
                    {pic}
                    <View style={[styles.flex, styles.centerH, styles.flexDirectionRowNotFlex]}>
                        <Text style={[styles.flex, styles.smallText, {
                            fontWeight: "bold",
                        }]}>
                            {actionUser}
                        </Text>
                        <TimeText style={[styles.subSmallText,{marginTop: 0}]}
                                  time={actionTime}/>
                    </View>
                </View>
                <View style={[styles.flexDirectionRowNotFlex, {marginTop: Constant.normalMarginEdge}]}>
                    <Text style={[styles.smallText, {fontWeight: "bold"}]}>{actionTarget}</Text>
                </View>
                {/* 评论数 */}
                <View style={[styles.flexDirectionRowNotFlex]}>
                    <Text style={[styles.flex, styles.smallText, {
                        fontWeight: "100",
                        color: "grey",
                        textAlign: "right"
                    }]}>
                        <Icon name="message-square" size={14} />
                        {' ' + actionComment}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

PostItem.propTypes = {
    actionTime: PropTypes.string,
    actionUser: PropTypes.string,
    actionUserPic: PropTypes.string,
    actionMode: PropTypes.string,
    actionTarget: PropTypes.string,
    des: PropTypes.string,
    onPressItem: PropTypes.func,
}

export default PostItem