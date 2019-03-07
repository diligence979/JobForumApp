import { USER } from '../type';
import { createReducer } from '../'

const initialState = {
    //当前登录用户信息
    ownerInfo: {},
};

const actionHandler = {
    [USER.USER_INFO]: (state, action) => {
        return {
            ...state,
            ownerInfo: action.res
        }
    },
};

export default createReducer(initialState, actionHandler)