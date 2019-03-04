import React, { Component } from 'react' 
import {
    View,
    Text
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'
import TimeText from '../TimeText'
import UserImage from '../UserImage'
import * as Constant from '../../../style/constant'
import styles from '../../../style'

class PostDetailItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { user, title, content, created_at, count } = this.props
        let { username, userpic } = user
        let pic = (userpic) ? <UserImage uri={userpic}
                                        loginUser={username}
                                        resizeMethod="scale"
                                        style={[{
                                            height: Constant.smallIconSize, width: Constant.smallIconSize,
                                            marginTop: 5,
                                            marginRight: Constant.normalMarginEdge / 2,
                                            borderRadius: Constant.smallIconSize / 2
                                        }]}/> : <View/> 
        return (
            <View
                style={[{
                    marginTop: Constant.normalMarginEdge / 2,
                    marginBottom: Constant.normalMarginEdge / 2,
                    padding: Constant.normalMarginEdge,
                    borderRadius: 4,
                }]}
            >
                <View style={[styles.flexDirectionRowNotFlex,]}>
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
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginTop: Constant.normalMarginEdge,
                    marginBottom: Constant.normalMarginEdge
                }]}>
                    <Text style={[styles.smallText, {
                        fontWeight: "bold"
                    }]}>{title}</Text>
                </View>
                <View style={[styles.flexDirectionRowNotFlex, {
                    paddingTop: Constant.normalMarginEdge,
                    borderTopColor: "#EEE9E9",
                    borderTopWidth: 1,
                    borderStyle: "solid"
                }]}>
                    <Text style={[styles.smallText]}>{content}</Text>
                </View>
                {/* 评论数 */}
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginTop: Constant.normalMarginEdge * 5
                }]}>
                    <Text style={[styles.subSmallText, {
                        fontSize: 12,
                    }]}>
                        {count}条评论
                        <Icon name="chevrons-down" size={16} color="#959595" />
                    </Text>
                </View>
            </View>
        )
    }
}

PostDetailItem.propTypes = {
    user: PropTypes.object,
    count: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string
}

export default PostDetailItem