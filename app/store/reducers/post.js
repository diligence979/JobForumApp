import { POST } from '../type'
import { createReducer } from '..'

const initialState = {
    received_posts_data_list: [],
    received_posts_current_size: 0,
    received_user_posts_data_list: [],
    received_user_posts_current_size: 0
}

const actionHandler = {
    [POST.RECEIVED_POSTS]: (state, action) => {
        return {
            ...state,
            received_posts_data_list: action.res,
            received_posts_current_size: action.res.length
        }
    },
    [POST.RECEIVED_USER_POSTS]: (state, action) => {
        return {
            ...state,
            received_user_posts_data_list: action.res,
            received_user_posts_current_size: action.res.length
        }
    }
}

export default createReducer(initialState, actionHandler)