import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    WebView,
    ActivityIndicator
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import IconF from 'react-native-vector-icons/FontAwesome'
import UserImage from '../UserImage'
import styles from '../../../style'
import * as Constant from '../../../style/constant'
import IconTextItem from '../IconTextItem'


/**
 * 用户页面头部
 */
class UserDetailItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <View style={[{
                    paddingHorizontal: Constant.normalMarginEdge,
                    paddingTop: 2 * Constant.normalMarginEdge,
                    backgroundColor: Constant.primaryColor,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 1,
                        height: 2
                    },
                    shadowOpacity: 0.7,
                    shadowRadius: 5,
                    borderBottomRightRadius: 2,
                    borderBottomLeftRadius: 2,
                    elevation: 2,
                }]}>
                    <View style={[styles.flexDirectionRowNotFlex, styles.justifyCenter, {
                        marginBottom: Constant.normalMarginEdge * 2,
                    }]}>
                        <View style={[{
                            height: Constant.largeIconSize,
                            width: Constant.largeIconSize,
                        }]}>
                            <Image source={require('../../../img/my.png')}
                                   resizeMethod="scale"
                                   style={[styles.centerH, {
                                        height: Constant.largeIconSize, width: Constant.largeIconSize,
                                        borderRadius: Constant.largeIconSize / 2,
                                        marginTop: 5
                            }]}/>
                        </View>         
                    </View>
                    <View style={[styles.flexDirectionRowNotFlex, styles.justifyCenter, styles.centerH, {
                        marginBottom: Constant.normalMarginEdge * 2,
                    }]}>
                        <Text selectable={true} style={[styles.largeTextWhite, {
                            fontWeight: "bold"
                        }]}>李志鹏</Text>
                    </View>
                </View>
            </View>
        )
    }
}

UserDetailItem.propTypes = {
    
}


UserDetailItem.defaultProps = {
    
}


export default UserDetailItem