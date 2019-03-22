import { AsyncStorage } from 'react-native'
import { OWNER } from '../../config/type'
import store from '..'
import * as Constant from '../../style/constant'
import api from '../../api'

const { dispatch, getState } = store

/**
 * 初始化用户信息
 */
const initOwnerInfo = (ownerId, username, avatar, role) => async (dispatch, getState) => {
    let ownerInfo = { ownerId, username, avatar, role }
    dispatch({
        type: OWNER.OWNER_INFO,
        res: ownerInfo
    })
    return ownerInfo
}

const clearOwnerInfo = () => {
    AsyncStorage.removeItem(Constant.OWNER_NAME_KEY)
    AsyncStorage.removeItem(Constant.PW_KEY)
    dispatch({
        type: OWNER.OWNER_INFO,
        res: null
    })
}

const uploadUserAvatar = async (ownerId, username, avatar, role, cb) => {
    let res = await api.uploadUserAvatar(ownerId, avatar)
    let ownerInfo = { ownerId, username, avatar, role }
    if (res && res.data.code) {
        dispatch({
            type: OWNER.OWNER_INFO,
            res: ownerInfo
        })
        cb({
            data: res.data,
            result: true
        })
    } else {
        cb({
            result: false
        })
    }
}

const uploadHrAvatar = async (ownerId, username, avatar, role, cb) => {
    let res = await api.uploadHrAvatar(ownerId, avatar)
    let ownerInfo = { ownerId, username, avatar, role }
    if (res && res.data.code) {
        dispatch({
            type: OWNER.OWNER_INFO,
            res: ownerInfo
        })
        cb({
            data: res.data,
            result: true
        })
    } else {
        cb({
            result: false
        })
    }
}

export default {
    initOwnerInfo,
    clearOwnerInfo,
    uploadUserAvatar,
    uploadHrAvatar
}