import { combineReducers } from 'redux';
import login from './login'
// import user from "./user"
import event from './event'
import comment from './comment'
// import issue from "./issue"


export default combineReducers({
    login: login,
    // user: user,
    event: event,
    comment: comment
    // issue: issue,
});

export function clear(state) {
    state().event.received_events_data_list = [];
    state().repository.trend_repos_data_list = [];
}