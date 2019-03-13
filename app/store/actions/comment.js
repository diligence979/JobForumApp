import { COMMENT } from '../../config/type'
import api from '../../api'
import { clearComment } from '../reducers'

const getCommentReceived = (page = 0, type, id, cb) => async (dispatch, getState) => {
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
        cb && cb(data)
    } else {
        cb && cb(null)
    }
}

const createPostComment = async (content, ownerId, role, postId) => {
    let res = null
    if (role) {
        res = await api.createPostCommentByHr(content, ownerId, postId)
    } else {
        res = await api.createPostCommentByUser(content, ownerId, postId)
    } 
    if (res && res.data.code) {
        return {
            data: res.data,
            result: true
        }
    } else {
        return {
            result: false
        }
    }
}

const createAdComment = async (content, ownerId,  role, adId) => {
    let res = null
    if (role) {
        res = await api.createAdCommentByHr(content, ownerId, adId)
    } else {
        res = await api.createAdCommentByUser(content, ownerId, adId)
    } 
    if (res && res.data.code) {
        return {
            data: res.data,
            result: true
        }
    } else {
        return {
            result: false
        }
    }
}

const deleteCommentByHr = (hrId, commentId, cb) => async (dispatch, getState) => {
    let res = await api.deleteCommentByHr(hrId, commentId)
    let code = res.data.code
    if (res && res.data) {
        let comment = getState()['comment'].received_comments_data_list
        let index = comment.findIndex((ele) => {
            return (ele.id === commentId)
        })
        
        dispatch({
            type: COMMENT.RECEIVED_COMMENTS,
            res: comment.splice(index, 1)
        })
        cb && cb(code)
    } else {
        cb && cb(null)
    }
}

const deleteCommentByUser = (userId, commentId, cb) => async (dispatch, getState) => {
    let res = await api.deleteCommentByUser(userId, commentId)
    let code = res.data.code
    if (res && res.data) {
        let comment = getState()['comment'].received_comments_data_list
        let index = comment.findIndex((ele) => {
            return (ele.id === commentId)
        })
        
        dispatch({
            type: COMMENT.RECEIVED_COMMENTS,
            res: comment.splice(index, 1)
        })
        cb && cb(code)
    } else {
        cb && cb(null)
    }
}

const clearCommentList = () => async (dispatch, getState) => {
    console.log('执行了！')
    dispatch({
        type: COMMENT.CLEAR_COMMENTS_LIST,
        res: true
    })
}

export default {
    getCommentReceived,
    createPostComment,
    createAdComment,
    deleteCommentByHr,
    deleteCommentByUser,
    clearCommentList
}