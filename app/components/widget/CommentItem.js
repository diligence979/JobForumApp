import React, { Component } from 'react'
import {
    View, 
    Text, 
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import styles from '../../style'
import * as Constant from '../../style/constant'
import TimeText from './TimeText'
import UserImage from './UserImage'
import Icon from 'react-native-vector-icons/Feather'
import user from '../../store/actions/user'

class CommentItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { username, content, created_at, userpic } = this.props
        let bottomDes = (this.props.des) ?
            <Text style={[styles.subSmallText,
                {marginTop: Constant.normalMarginEdge,}]}
                  numberOfLines={Constant.normalNumberOfLine}>
                {this.props.des}
            </Text> : <View/>
        let pic = (userpic) ? <UserImage uri={userpic}
                                               loginUser={actionUser}
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
                    <Text style={[styles.smallText, {fontWeight: "bold"}]}>{content}</Text>
                </View>
                {bottomDes}
            </View>
        )
    }
}

CommentItem.propTypes = {
    username: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string
}

export default CommentItem