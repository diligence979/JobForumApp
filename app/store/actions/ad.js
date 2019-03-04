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

export default {
    getAdReceived,
}