import { COMMENT } from '../../config/type'
import store from '..'
import api from '../../api'

const { dispatch, getState } = store

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
    let count = data.count
    if (res && res.data) {
        let newState = {}
        if (page === 0) {
            newState = { rows, count }
            dispatch({
                type: COMMENT.RECEIVED_COMMENTS,
                res: newState
            })
        } else {
            let comment = getState()['comment'].received_comments_data_list
            newState = {
                rows: comment.concat(rows),
                count
            }
            dispatch({
                type: COMMENT.RECEIVED_COMMENTS,
                res: newState
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
        let row = res.data.data
        let comment = getState()['comment'].received_comments_data_list
        dispatch({
            type: COMMENT.RECEIVED_COMMENTS,
            res:   comment.concat(row)
        })
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
        let newState = {}
        let comment = getState()['comment'].received_comments_data_list
        let size = getState()['comment'].received_comments_current_size
        let index = comment.findIndex((ele) => {
            return (ele.id === commentId)
        })
        comment.splice(index, 1)
        newState = {
            rows: comment,
            count: --size
        }
        dispatch({
            type: COMMENT.RECEIVED_COMMENTS,
            res: newState
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
        let newState = {}
        let comment = getState()['comment'].received_comments_data_list
        let size = getState()['comment'].received_comments_current_size
        let index = comment.findIndex((ele) => {
            return (ele.id === commentId)
        })
        comment.splice(index, 1)
        newState = {
            rows: comment,
            count: --size
        }
        console.log(newState)
        dispatch({
            type: COMMENT.RECEIVED_COMMENTS,
            res: newState
        })
        cb && cb(code)
    } else {
        cb && cb(null)
    }
}

const clearCommentList = () => async (dispatch, getState) => {
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