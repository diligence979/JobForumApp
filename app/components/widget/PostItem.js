import React, { Component } from 'react' 
import {
    View,
    Text
} from 'react-native' 
import PropTypes from 'prop-types' 
import TimeText from './TimeText'
import UserImage from './UserImage'
import * as Constant from '../../style/constant'
import styles from '../../style'

class PostItem extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        let { user, title, content, created_at } = this.props
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
                    marginLeft: Constant.normalMarginEdge,
                    marginRight: Constant.normalMarginEdge,
                    marginBottom: Constant.normalMarginEdge / 2,
                    padding: Constant.normalMarginEdge,
                    borderRadius: 4,
                }, styles.shadowCard]}
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
                <View style={[styles.flexDirectionRowNotFlex, {marginTop: Constant.normalMarginEdge}]}>
                        <Text style={[styles.smallText, {
                            fontWeight: "bold"
                        }]}>{title}</Text>
                </View>
                <Text style={{
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'dotted',
                    color: 'grey' }}>————————————————————————</Text>
                <View style={[styles.flexDirectionRowNotFlex, {marginTop: Constant.normalMarginEdge}]}>
                        <Text style={[styles.smallText]}>{content}</Text>
                </View>
            </View>
        )
    }
}

PostItem.propTypes = {
    user: PropTypes.object,
    title: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string
}

export default PostItem