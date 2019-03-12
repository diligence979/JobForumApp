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

const uploadUserAvatar = async (userId, avatar) => {
    let res = await api.uploadUserAvatar(userId, avatar)
    let ownerInfo = { avatar }
    if (res && res.data.code) {
        dispatch({
            type: OWNER.OWNER_INFO,
            res: ownerInfo
        })
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
    let ownerInfo = { avatar }
    if (res && res.data.code) {
        dispatch({
            type: OWNER.OWNER_INFO,
            res: ownerInfo
        })
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