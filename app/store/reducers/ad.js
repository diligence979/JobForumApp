import { AD } from '../type'
import { createReducer } from '..'

const initialState = {
    received_ads_data_list: [],
    received_ads_current_size: 0,
    received_user_ads_data_list: [],
    received_user_ads_current_size: 0,
    received_popular_ads_data_list: []
}

const actionHandler = {
    [AD.RECEIVED_ADS]: (state, action) => {
        return {
            ...state,
            received_ads_data_list: action.res,
            received_ads_current_size: action.res.length
        }
    },
    [AD.RECEIVED_USER_ADS]: (state, action) => {
        return {
            ...state,
            received_user_ads_data_list: action.res,
            received_user_ads_current_size: action.res.length
        }
    },
    [AD.RECEIVED_POPULAR_ADS]: (state, action) => {
        return {
            ...state,
            received_popular_ads_data_list: action.res
        }
    }
}

export default createReducer(initialState, actionHandler) 