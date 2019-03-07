import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { InteractionManager } from 'react-native'
import userActions from '../store/actions/user'
import BasePersonPage from "./widget/person/BasePersonPage"

/**
 * 我的
 */
class MyPage extends BasePersonPage {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        super.componentDidMount()
        InteractionManager.runAfterInteractions(() => {
            // this._getOrgsList()
        })
    }
}

export default connect(state => ({
    userState: state.user
}), dispatch => ({
    userAction: bindActionCreators(userActions, dispatch)
}))(MyPage)