import { AsyncStorage } from 'react-native'
import { USER } from '../type'
import store from '../'
import * as Constant from '../../style/constant'

const { dispatch, getState } = store

/**
 * 初始化用户信息
 */
const initUserInfo = async (userId, username) => {
    let userInfo = { userId, username }
    dispatch({
        type: USER.USER_INFO,
        res: userInfo
    })
}

export default {
    initUserInfo
}