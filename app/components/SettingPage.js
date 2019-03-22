import React, { Component } from 'react'
import {
    View, StatusBar
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CommonRowItem from './widget/CommonRowItem'
import loginActions from '../store/actions/login'
import styles from "../style"
import * as Constant from '../style/constant'


/**
 * 设置页
 *
 * @class SettingPage
 * @extends {Component}
 */
class SettingPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
                <CommonRowItem
                    showIconNext={false}
                    topLine={false}
                    bottomLine={false}
                    textStyle={[styles.centered, styles.normalTextWhite, {textAlign: 'center'}]}
                    viewStyle={[styles.shadowCard, {
                        backgroundColor: "#cd2130",
                        borderRadius: 4,
                        marginTop: 2 * Constant.normalMarginEdge
                    }]}
                    itemText={'退出登录'}
                    onClickFun={() => {
                        Actions.reset("LoginPage")
                        this.props.loginAction.loginOut()
                    }}
                />
            </View>
        )
    }
}


export default connect(state => ({
    state
}), dispatch => ({
    loginAction: bindActionCreators(loginActions, dispatch)
}))(SettingPage)