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

const hrLogin = async (username, password) => {
    return axios.post(host + hr + '/login', {
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

const createHr = async (username, password) => {
    return axios.post(host + hr, {
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

const createPost = async (title, content, ownerId) => {
    return axios.post(host + post, {
        title: title,
        content: content,
        user_id: ownerId
    }).catch(function (error) {
        return error.response 
    })
}

const createPostCommentByUser = async (content, userId, post_id) => {
    return axios.post(host + 'users/' + comment, {
        content: content,
        user_id: userId,
        post_id: post_id
    }).catch(function (error) {
        return error.response 
    })
}

const createPostCommentByHr = async (content, hrId, post_id) => {
    return axios.post(host + 'users/' + comment, {
        content: content,
        hr_id: hrId,
        post_id: post_id
    }).catch(function (error) {
        return error.response 
    })
}

const createAdCommentByUser = async (content, ownerId, ad_id) => {
    return axios.post(host + 'users/' + comment, {
        content: content,
        user_id: ownerId,
        ad_id: ad_id
    }).catch(function (error) {
        return error.response 
    })
}

const createAdCommentByHr = async (content, ownerId, ad_id) => {
    return axios.post(host + 'users/' + comment, {
        content: content,
        hr_id: ownerId,
        ad_id: ad_id
    }).catch(function (error) {
        return error.response 
    })
}

const createAd = async (ownerId, company, job, education,  team, location, salay, email, jd) => {
    return axios.post(host + ad, {
        hr_id: ownerId,
        company: company,
        job: job,
        education: education,
        team: team,
        location: location,
        salay: salay,
        email: email,
        jd: jd
    }).catch(function (error) {
        return error.response 
    })
}

export default {
    userLogin,
    hrLogin,
    createUser,
    createHr,
    getPost,
    getPostComment,
    getAdComment,
    getAd,
    createPost,
    createPostCommentByUser,
    createPostCommentByHr,
    createAdCommentByUser,
    createAdCommentByHr,
    createAd
}