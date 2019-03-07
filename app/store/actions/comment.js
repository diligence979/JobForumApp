import { COMMENT } from '../type'
import api from '../../api'
import { clearComment } from '../reducers'

const getCommentReceived = (page = 0, type, id, callback) => async (dispatch, getState) => {
    const offset = page * 30
    let res = {}
    if (type === 'post') {
        res = await api.getPostComment(offset, id)
    } else if (type === 'ad') {
        res = await api.getAdComment(offset, id)
    }
    let data = res.data.data
    let rows = res.data.data.rows
    if (res && res.data) {
        if (page === 0) {
            dispatch({
                type: COMMENT.RECEIVED_COMMENTS,
                res: rows
            })
        } else {
            let comment = getState()['comment'].received_comments_data_list
            dispatch({
                type: COMMENT.RECEIVED_COMMENTS,
                res:   comment.concat(rows)
            })
        }
        callback && callback(data)
    } else {
        callback && callback(null)
    }
}

export default {
    getCommentReceived,
}