import React, { Component } from 'react'
import {
    View, 
    Text, 
    TouchableOpacity
} from 'react-native'
import { Button, Avatar } from 'react-native-elements'
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
        let { actionTime, actionUser, actionComment, actionTarget, actionAvatar, showDelete } = this.props
        let pic = (actionAvatar) ? <UserImage uri={'data:image/png;base64,' + actionAvatar}
                                               loginUser={actionUser}
                                               resizeMethod="scale"
                                               style={[{
                                                   height: Constant.smallIconSize, width: Constant.smallIconSize,
                                                   marginTop: 5,
                                                   marginRight: Constant.normalMarginEdge / 2,
                                                   borderRadius: Constant.smallIconSize / 2
                                               }]}/> : 
                                    <Avatar rounded
                                            source={require('../../../img/mypic.jpg')}
                                            containerStyle={[{
                                            height: Constant.smallIconSize, width: Constant.smallIconSize,
                                            marginTop: 5,
                                            marginRight: Constant.normalMarginEdge / 2,
                                            borderRadius: Constant.smallIconSize / 2
                                        }]}/>
        let commentSize = (!showDelete) ? 
            <View style={[styles.flexDirectionRowNotFlex]}>
                <Text style={[styles.flex, styles.smallText, {
                    fontWeight: "100",
                    color: "grey",
                    textAlign: "right"
                }]}>
                    <Icon name="message-square" size={14} />
                    {' ' + actionComment}
                </Text>
            </View> : 
            <View style={[styles.flexDirectionRowNotFlex, styles.justifyEnd]}>
                <Button
                    icon={
                      <Icon name="trash-2" size={14}/>
                    }
                    buttonStyle={{
                        backgroundColor: "transparent",
                    }}
                    onPress={() => {
                        this.props.deleteItem && this.props.deleteItem()
                    }}
                />
            </View>

        return (
            <TouchableOpacity
                style={[styles.shadowCard, {
                    backgroundColor: Constant.cardBackgroundColor,
                    marginTop: Constant.normalMarginEdge / 2,
                    marginLeft: Constant.normalMarginEdge,
                    marginRight: Constant.normalMarginEdge,
                    marginBottom: Constant.normalMarginEdge / 2,
                    padding: Constant.normalMarginEdge,
                }]}
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
                {commentSize}
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
    actionAvatar: PropTypes.string,
    showDelete: PropTypes.bool,
    onPressItem: PropTypes.func,
    deleteItem: PropTypes.func
}

export default PostItem