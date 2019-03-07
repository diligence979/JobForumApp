import axios from 'axios'

const host = 'http://127.0.0.1:7001/api/'
const user = 'user'
const ad = 'ad'
const hr = 'hr'
const post = 'post'
const comment = 'comment'

const userLogin = async (username, password) => {
    return axios.post(host + user + '/login', {
        username: username,
        password: password
    })
}

const createUser = async (username, password) => {
    return axios.post(host + user, {
        username: username,
        password: password
    }).catch(function (error) {
        return error.response 
    })
}

const getPost = async (offset) => {
    return axios.get(host + post + '?offset=' + `${offset}`).catch(function (error) {
        return error.response 
    })
}

const getPostComment = async (offset, postId) => {
    return axios.get(host + 'users/' + comment + '?offset=' + `${offset}` + '&post_id=' + postId).catch(function (error) {
        return error.response 
    })
}

const getAdComment = async (offset, adId) => {
    return axios.get(host + 'users/' + comment + '?offset=' + `${offset}` + '&ad_id=' + adId).catch(function (error) {
        return error.response 
    })
}

const getAd = async (offset) => {
    return axios.get(host + ad + '?offset=' + `${offset}`).catch(function (error) {
        return error.response 
    })
}

const createPost = async (title, content, userId) => {
    return axios.post(host + post, {
        title: title,
        content: content,
        user_id: userId
    }).catch(function (error) {
        return error.response 
    })
}

const createPostComment = async (content, userId) => {

}

const createAdComment = async (content, hrId) => {

}

export default {
    userLogin,
    createUser,
    getPost,
    getPostComment,
    getAdComment,
    getAd,
    createPost,
    createPostComment,
    createAdComment
}