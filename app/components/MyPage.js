import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { InteractionManager } from 'react-native'
import ownerActions from '../store/actions/owner'
import adActions from '../store/actions/ad'
import postActions from '../store/actions/post'
import BasePersonPage from "./person/BasePersonPage"

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
    ownerState: state.owner,
    adState: state.ad,
    postState: state.post
}), dispatch => ({
    ownerAction: bindActionCreators(ownerActions, dispatch),
    adAction: bindActionCreators(adActions, dispatch),
    postAction: bindActionCreators(postActions, dispatch)
}))(MyPage)