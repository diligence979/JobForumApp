import { AD } from '../type'
import { createReducer } from '..'

const initialState = {
    received_ads_data_list: [],
    received_ads_current_size: 0,
}

const actionHandler = {
    [AD.RECEIVED_ADS]: (state, action) => {
        return {
            ...state,
            received_ads_data_list: action.res,
            received_ads_current_size: action.res.length
        }
    }
}

export default createReducer(initialState, actionHandler) 