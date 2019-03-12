import React, { Component } from 'react'
import {
    View, 
    Text
} from 'react-native'
import PropTypes from 'prop-types'
import { Button, Avatar } from 'react-native-elements'
import styles from '../../style'
import * as Constant from '../../style/constant'
import TimeText from '../widget/TimeText'
import UserImage from '../widget/UserImage'
import Icon from 'react-native-vector-icons/Feather'


class CommentItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { ownerId, userId, username, content, created_at, avatar } = this.props
        let pic = (avatar) ? <UserImage uri={'data:image/png;base64,' + avatar}
                                loginUser={username}
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
        return (
            <View
                style={[{
                    marginTop: Constant.normalMarginEdge / 2,
                    marginBottom: Constant.normalMarginEdge / 2,
                    padding: Constant.normalMarginEdge,
                    borderBottomColor: "#F4F4F4",
                    borderBottomWidth: 1,
                    borderStyle: "solid"
                }]}
            >
                <View style={[styles.flexDirectionRowNotFlex]}>
                    {pic}
                    <View style={[styles.flex, styles.centerH, styles.flexDirectionRowNotFlex]}>
                        <Text style={[styles.flex, styles.smallText, {
                            fontWeight: "bold",
                        }]}>
                            {username}
                        </Text>
                        <TimeText style={[styles.subSmallText,{marginTop: 0}]}
                                  time={created_at}/>
                    </View>
                </View>
                <View style={[styles.flexDirectionRowNotFlex, {marginTop: Constant.normalMarginEdge}]}>
                    <Text style={[styles.smallText]}>{content}</Text>
                </View>
                <View style={[styles.flexDirectionRowNotFlex, styles.justifyEnd]}>
                    <Button
                        icon={
                          (ownerId === userId) ? 
                          <Icon name="trash-2" size={14}/> :
                          <Icon name="trash-2" size={14} color="#959595"/>
                        }
                        disabled={ownerId !== userId}
                        disabledStyle={{
                            backgroundColor: "transparent",
                        }}
                        buttonStyle={{
                            backgroundColor: "transparent",
                        }}
                        onPress={() => {
                            this.props.deleteComment && this.props.deleteComment()
                        }}
                    />
                </View>
            </View>
        )
    }
}

CommentItem.propTypes = {
    ownerId: PropTypes.number,
    userId: PropTypes.number,
    username: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    deleteComment: PropTypes.func,
    avatar: PropTypes.string
}

export default CommentItem