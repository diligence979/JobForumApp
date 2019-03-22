import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Feather'
import styles from "../../style"
import * as Constant from '../../style/constant'


/**
 * 自定义设置框
 *
 * @class SettingButton
 * @extends {Component}
 */
class SettingButton extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={[styles.centered, {
                    marginHorizontal: Constant.normalMarginEdge,
                    paddingLeft: 20
                }]} 
                onPress={() => {
                    Actions.SettingPage()
                }}
            >
                <Icon name={'settings'} size={25} color={Constant.miWhite}/>
            </TouchableOpacity>
        )
    }
}

export default SettingButton