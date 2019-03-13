import { OWNER } from '../../config/type'
import store from '..'
import api from '../../api';

const { dispatch, getState } = store

/**
 * 初始化用户信息
 */
const initOwnerInfo = async (ownerId, username, avatar, role) => {
    let ownerInfo = { ownerId, username, avatar, role }
    dispatch({
        type: OWNER.OWNER_INFO,
        res: ownerInfo
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
    uploadUserAvatar,
    uploadHrAvatar
}