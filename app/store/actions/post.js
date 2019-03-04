import { POST } from '../type'
import api from '../../api'

const getPostReceived = (page = 0, callback) => async (dispatch, getState) => {
    let res = await api.getPost(page*30)
    let data = res.data.data
    let rows = res.data.data.rows
    if (res && res.data) {
        if (page === 0) {
            dispatch({
                type: POST.RECEIVED_POSTS,
                res: rows
            })
        } else {
            let post = getState()['post'].received_posts_data_list
            dispatch({
                type: POST.RECEIVED_POSTS,
                res: post.concat(rows)
            })
        }
        callback && callback(data)
    } else {
        callback && callback(null)
    }
}

export default {
    getPostReceived,
}