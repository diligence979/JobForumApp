import { OWNER } from '../../config/type';
import { createReducer } from '..'

const initialState = {
    //当前登录用户信息
    ownerInfo: {
        ownerId: NaN,
        usernamg: '',
        avatar: ''
    },
};

const actionHandler = {
    [OWNER.OWNER_INFO]: (state, action) => {
        return {
            ...state,
            ownerInfo: action.res
        }
    },
};

export default createReducer(initialState, actionHandler)