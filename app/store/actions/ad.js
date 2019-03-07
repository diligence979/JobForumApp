import { AD } from '../type'
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

export default {
    getAdReceived,
    createAd
}