import { COMMENT } from '../../config/type'
import { createReducer } from '../'

const initialState = {
    received_comments_data_list: [],
    received_comments_current_size: 0,
}

const actionHandler = {
    [COMMENT.RECEIVED_COMMENTS]: (state, action) => {
        return {
            ...state,
            received_comments_data_list: action.res,
            received_comments_current_size: action.res.length
        }
    }
}

export default createReducer(initialState, actionHandler)