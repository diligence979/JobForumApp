import { combineReducers } from 'redux'
import login from './login'
// import user from "./user"
import post from './post'
import comment from './comment'
import ad from './ad'

export default combineReducers({
    login: login,
    // user: user,
    post: post,
    comment: comment,
    ad: ad,
})

export function clear(state) {
    state().event.received_events_data_list = [];
    state().repository.trend_repos_data_list = [];
}