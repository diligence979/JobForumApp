import { POST } from '../../config/type'
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

const createPost = async (title, content, ownerId) => {
    let res = await api.createPost(title, content, ownerId)
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

const getPostByUser = (userId, page = 0, callback) => async (dispatch, getState) => {
    let res = await api.getPostByUser(userId, page*30)
    let data = res.data.data
    let rows = data.rows
    if (res && res.data) {
        if (page === 0) {
            dispatch({
                type: POST.RECEIVED_USER_POSTS,
                res: rows
            })
        } else {
            let post = getState()['post'].received_user_posts_data_list
            dispatch({
                type: POST.RECEIVED_USER_POSTS,
                res: post.concat(rows)
            })
        }
        callback && callback(data)
    } else {
        callback && callback(null)
    }
}

const deletePost = (userId, postId, callback) => async (dispatch, getState) => {
    let res = await api.deletePost(userId, postId)
    let code = res.data.code
    if (res && res.data) {
        let post = getState()['post'].received_user_posts_data_list
        let index = post.findIndex((ele) => {
            return (ele.id === postId)
        })
        post.splice(index, 1)
        dispatch({
            type: POST.RECEIVED_USER_POSTS,
            res: post
        })
        callback && callback(code)
    } else {
        callback && callback(null)
    }
}

const getPopularPost = (callback) => async (dispatch, getState) => {
    let res = await api.getPopularPost()
    let data = res.data.data
    let rows = res.data.data.rows
    if (res && res.data) {
        dispatch({
            type: POST.RECEIVED_POPULAR_POSTS,
            res: rows
        })
        callback && callback(data)
    } else {
        callback && callback(null)
    }
}

export default {
    getPostReceived,
    createPost,
    getPostByUser,
    deletePost,
    getPopularPost
}