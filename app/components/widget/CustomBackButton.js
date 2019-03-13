import React, { Component } from 'react'
import {
    View,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import styles from "../../style"
import * as Constant from '../../style/constant'
import Icon from 'react-native-vector-icons/Ionicons'

/**
 * 自定义返回按键
 */
class BackButton extends Component {
    render() {
        if (this.props.hideBackButton) {
            return <View/>
        }
        return (
            <TouchableOpacity style={[styles.centered, {marginHorizontal: 2 * Constant.normalMarginEdge, marginTop:5}]} 
                              onPress={() => {
                                  Actions.pop({ refresh: {} })
                              }}>
                <Icon name={'md-arrow-round-back'} size={20} color={Constant.miWhite}/>
            </TouchableOpacity>
        )
    }
}

BackButton.propTypes = {
    hideBackButton: PropTypes.bool
}
BackButton.defaultProps = {
    hideBackButton: false
}

export default BackButton