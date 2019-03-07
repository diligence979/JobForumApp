import { AsyncStorage } from 'react-native'
import { Buffer } from 'buffer'
import { LOGIN } from '../type'
import userAction from './user'
import * as Constant from '../../style/constant'
import { clear } from '../reducers'
import api from '../../api'

/**
 * 登陆请求
 */
const doLogin = (userName, password, role, callback) => async (dispatch, getState) => {
    let base64Str = Buffer(userName + ":" + password).toString('base64')
    let res = null
    AsyncStorage.setItem(Constant.USER_NAME_KEY, userName)
    AsyncStorage.setItem(Constant.USER_BASIC_CODE, base64Str)
    AsyncStorage.setItem(Constant.USER_ROLE, role.toString())
    if (role) {
        // HR 登陆
        res = await api.hrLogin(userName, password)
    } else {
        // 求职者 登陆
        res = await api.userLogin(userName, password)
    }
    let info = res.data.data
    if (res && res.data.code) {
        AsyncStorage.setItem(Constant.PW_KEY, password)
        dispatch({
            type: LOGIN.IN,
            res
        })
        userAction.initOwnerInfo(info.id, info.username, role)
    }
    callback(res.data)
}

/**
 * 注册请求
 */
const doRegister = (userName, password, role, callback) => async (dispatch, getState) => {
    let base64Str = Buffer(userName + ":" + password).toString('base64')
    let res = null
    if (role) {
        // HR 注册
        res = await api.createHr(userName,password)
    } else {
        // 求职者 注册
        res = await api.createUser(userName,password)
    }
    let info = res.data.data
    if (res && res.data.code) {
        AsyncStorage.setItem(Constant.USER_NAME_KEY, userName)
        AsyncStorage.setItem(Constant.USER_BASIC_CODE, base64Str)
        AsyncStorage.setItem(Constant.USER_ROLE, role.toString())
        dispatch({
            type: LOGIN.IN,
            res
        })
        userAction.initOwnerInfo(info.id, info.username, role)
    }
    callback(res.data)
}

/**
 * 退出登录
 */
const loginOut = () => async (dispatch, getState) => {
    Api.clearAuthorization()
    AsyncStorage.removeItem(Constant.USER_BASIC_CODE)
    userAction.clearUserInfo()
    clear(getState)
    dispatch({
        type: LOGIN.CLEAR,
    })
}

/**
 * 获取当前登录用户的参数
 */
const getLoginParams = async () => {
    let userName = await AsyncStorage.getItem(Constant.USER_NAME_KEY)
    let password = await AsyncStorage.getItem(Constant.PW_KEY)
    return {
        userName: (userName) ? userName : "",
        password: (password) ? password : "",
    }
}

export default {
    getLoginParams,
    doLogin,
    doRegister,
    loginOut
}