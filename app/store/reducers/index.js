import { combineReducers } from 'redux'
import login from './login'
import owner from "./owner"
import post from './post'
import comment from './comment'
import ad from './ad'

export default combineReducers({
    login: login,
    owner: owner,
    post: post,
    comment: comment,
    ad: ad,
})

export function clearComment(state) {
    state().comment.received_events_data_list = []
}