import { AD } from '../../config/type'
import api from '../../api'

const getAdReceived = (page = 0, callback) => async (dispatch, getState) => {
    let res = await api.getAd(page*30)
    let data = res.data.data
    let rows = res.data.data.rows
    if (res && res.data) {
        if (page === 0) {
            dispatch({
                type: AD.RECEIVED_ADS,
                res: rows
            })
        } else {
            let ad = getState()['ad'].received_ads_data_list
            dispatch({
                type: AD.RECEIVED_ADS,
                res: ad.concat(rows)
            })
        }
        callback && callback(data)
    } else {
        callback && callback(null)
    }
}

const createAd = async (ownerId, company, job, education,  team, location, salay, email, jd) => {
    let res = await api.createAd(ownerId, company, job, education,  team, location, salay, email, jd)
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

const getAdByHr = (adId, page = 0, callback) => async (dispatch, getState) => {
    let res = await api.getAdByHr(adId, page*30)
    let data = res.data.data
    let rows = data.rows
    if (res && res.data) {
        if (page === 0) {
            dispatch({
                type: AD.RECEIVED_USER_ADS,
                res: rows
            })
        } else {
            let ad = getState()['ad'].received_user_ads_data_list
            dispatch({
                type: AD.AD.RECEIVED_USER_ADS,
                res: ad.concat(rows)
            })
        }
        callback && callback(data)
    } else {
        callback && callback(null)
    }
}

const deleteAd = (hrId, adId, callback) => async (dispatch, getState) => {
    let res = await api.deleteAd(hrId, adId)
    let code = res.data.code
    if (res && res.data) {
        let ad = getState()['ad'].received_user_ads_data_list
        let index = ad.findIndex((ele) => {
            return (ele.id === adId)
        })
        
        dispatch({
            type: AD.RECEIVED_USER_ADS,
            res: ad.splice(index, 1)
        })
        callback && callback(code)
    } else {
        callback && callback(null)
    }
}

const getPopularAd = (callback) => async (dispatch, getState) => {
    let res = await api.getPopularAd()
    let data = res.data.data
    let rows = res.data.data.rows
    if (res && res.data) {
        dispatch({
            type: AD.RECEIVED_POPULAR_ADS,
            res: rows
        })
        callback && callback(data)
    } else {
        callback && callback(null)
    }
}

export default {
    getAdReceived,
    createAd,
    getAdByHr,
    deleteAd,
    getPopularAd
}