import { combineReducers } from 'redux'
import login from './login'
import user from "./user"
import post from './post'
import comment from './comment'
import ad from './ad'

export default combineReducers({
    login: login,
    user: user,
    post: post,
    comment: comment,
    ad: ad,
})

export function clearComment(state) {
    state().comment.received_events_data_list = []
}