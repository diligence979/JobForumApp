import { AsyncStorage } from 'react-native'
import { USER } from '../type'
import store from '../'
import * as Constant from '../../style/constant'

const { dispatch, getState } = store

/**
 * 初始化用户信息
 */
const initOwnerInfo = async (ownerId, username, role) => {
    let ownerInfo = { ownerId, username, role }
    dispatch({
        type: USER.USER_INFO,
        res: ownerInfo
    })
}

export default {
    initOwnerInfo
}