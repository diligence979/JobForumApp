import { EVENT } from '../type';
import api from '../../api';

/**
 * 用户接收事件
 */
const getEventReceived = (page = 0, callback) => async (dispatch, getState) => {
    let res = await api.getPost(page*30);
    let data = res.data.data
    let rows = res.data.data.rows
    if (res && res.data) {
        if (page === 0) {
            dispatch({
                type: EVENT.RECEIVED_EVENTS,
                res: rows
            });
        } else {
            let event = getState()['event'].received_events_data_list;
            dispatch({
                type: EVENT.RECEIVED_EVENTS,
                res: event.concat(rows)
            });
        }
        callback && callback(data);
    } else {
        callback && callback(null);
    }
};

export default {
    getEventReceived,
}