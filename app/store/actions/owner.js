import { AsyncStorage } from 'react-native'
import { OWNER } from '../type'
import store from '..'
import * as Constant from '../../style/constant'
import api from '../../api';

const { dispatch, getState } = store

/**
 * 初始化用户信息
 */
const initOwnerInfo = async (ownerId, username, role) => {
    let ownerInfo = { ownerId, username, role }
    dispatch({
        type: OWNER.OWNER_INFO,
        res: ownerInfo
    })
}

const uploadUserAvatar = async (userId, avatar) => {
    let res = await api.uploadUserAvatar(userId, avatar)
    console.log(res)
    if (res && res.data.code) {
        return {
            data: res.data,
            result: true
        }
    } else {
        return {
            result: false
        }
    }
}

const uploadHrAvatar = async (hrId, avatar) => {
    let res = await api.uploadHrAvatar(hrId, avatar)
    console.log(res)
    if (res && res.data.code) {
        return {
            data: res.data,
            result: true
        }
    } else {
        return {
            result: false
        }
    }
}

export default {
    initOwnerInfo,
    uploadUserAvatar,
    uploadHrAvatar
}