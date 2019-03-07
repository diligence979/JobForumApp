import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    InteractionManager
} from 'react-native'
import UserDetailItem from './UserDetailItem'


/**
 * 用户显示基础控件
 */
class BasePersonPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // if (this.refs.pullList)
            //     this.refs.pullList.showRefreshState()
            // this._refresh()
            // this._getMoreInfo()
        })
    }

    render() {
        return (
            <UserDetailItem></UserDetailItem>
        )
    }
}

export default BasePersonPage