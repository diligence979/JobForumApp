import axios from 'axios'

const host = 'http://127.0.0.1:7001/api/'
const users = 'users'
const ads = 'ads'
const hrs= 'hrs'
const posts = 'posts'
const comments = 'comments'

/* 创建讨论贴 */
const createPost = async (title, content, ownerId) => {
    return axios.post(host + posts, {
        title: title,
        content: content,
        user_id: ownerId
    }).catch(function (error) {
        return error.response 
    })
}

/* 删除讨论贴 */
const deletePost = async (userId, postId) => {
    return axios.delete(host + users + '/' + `${userId}` + '/' + posts + '/' + `${postId}`).catch(function (error) {
        return error.response 
    })
}

/* 获取动态页的讨论贴列表 */
const getPost = async (offset) => {
    return axios.get(host + posts + '?offset=' + `${offset}`).catch(function (error) {
        return error.response 
    })
}

/* 获取个人主页的讨论贴列表 */
const getPostByUser = async (userId, offset) => {
    return axios.get(host + users + '/' + userId + '/' + posts + '?offset=' + `${offset}`).catch(function (error) {
        return error.response 
    })
}

/* 获取热门讨论贴 */
const getPopularPost = async () => {
    return axios.get(host + comments + '/' + posts).catch(function (error) {
        return error.response 
    })
}

/* 创建招聘贴 */
const createAd = async (ownerId, company, job, education,  team, location, salay, email, jd) => {
    return axios.post(host + ads, {
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

/* 删除招聘贴 */
const deleteAd = async (hrId, adId) => {
    return axios.delete(host + hrs + '/' + `${hrId}` + '/' + ads + '/' + `${adId}`).catch(function (error) {
        return error.response 
    })
}

/* 获取推荐页的招聘贴列表 */
const getAd = async (offset) => {
    return axios.get(host + ads + '?offset=' + `${offset}`).catch(function (error) {
        return error.response 
    })
}

/* 获取个人主页的招聘贴列表 */
const getAdByHr = async (hrId, offset) => {
    return axios.get(host + hrs + '/' + hrId + '/' + ads +  '?offset=' + `${offset}`).catch(function (error) {
        return error.response 
    })
}

/* 获取热门招聘贴 */
const getPopularAd = async () => {
    return axios.get(host + comments + '/' + ads).catch(function (error) {
        return error.response 
    })
}

/* 求职者注册 */
const createUser = async (username, password) => {
    return axios.post(host + users, {
        username: username,
        password: password
    }).catch(function (error) {
        return error.response 
    })
}

/* 求职者登陆 */
const userLogin = async (username, password) => {
    return axios.post(host + users + '/login', {
        username: username,
        password: password
    })
}

/* 上传求职者头像 */
const uploadUserAvatar = async (userId, avatar) => {
    return axios.post(host + users + '/avatar', {
        id: userId,
        avatar: avatar
    }).catch(function (error) {
        return error.response 
    })
}

/* hr 注册 */
const createHr = async (username, password) => {
    return axios.post(host + hrs, {
        username: username,
        password: password
    }).catch(function (error) {
        return error.response 
    })
}

/* hr 登陆 */
const hrLogin = async (username, password) => {
    return axios.post(host + hrs + '/login', {
        username: username,
        password: password
    })
}

/* 上传 hr 头像 */
const uploadHrAvatar = async (hrId, avatar) => {
    return axios.post(host + hrs + '/avatar', {
        id: hrId,
        avatar: avatar
    }).catch(function (error) {
        return error.response 
    })
}

/* 获取讨论贴详情页的评论列表 */
const getPostComment = async (offset, postId) => {
    return axios.get(host + comments + '?offset=' + `${offset}` + '&post_id=' + postId).catch(function (error) {
        return error.response 
    })
}

/* 获取招聘贴详情页的评论列表 */
const getAdComment = async (offset, adId) => {
    return axios.get(host + comments + '?offset=' + `${offset}` + '&ad_id=' + adId).catch(function (error) {
        return error.response 
    })
}

/* 求职者创建讨论贴评论 */
const createPostCommentByUser = async (content, userId, post_id) => {
    return axios.post(host + comments, {
        content: content,
        user_id: userId,
        post_id: post_id
    }).catch(function (error) {
        return error.response 
    })
}

/* hr 创建讨论贴评论 */
const createPostCommentByHr = async (content, hrId, post_id) => {
    return axios.post(host + comments, {
        content: content,
        hr_id: hrId,
        post_id: post_id
    }).catch(function (error) {
        return error.response 
    })
}

/* 求职者创建招聘贴评论 */
const createAdCommentByUser = async (content, ownerId, ad_id) => {
    return axios.post(host + comments, {
        content: content,
        user_id: ownerId,
        ad_id: ad_id
    }).catch(function (error) {
        return error.response 
    })
}

/* hr 创建招聘贴评论 */
const createAdCommentByHr = async (content, ownerId, ad_id) => {
    return axios.post(host + comments, {
        content: content,
        hr_id: ownerId,
        ad_id: ad_id
    }).catch(function (error) {
        return error.response 
    })
}

/* hr 删除评论 */
const deleteCommentByHr = async (hrId, commentId) => {
    return axios.delete(host + hrs + '/' + `${hrId}` + '/' + comments + '/' + `${commentId}`).catch(function (error) {
        return error.response 
    })
}

/* 求职者删除评论 */
const deleteCommentByUser = async (userId, commentId) => {
    return axios.delete(host + users + '/' + `${userId}` + '/' + comments + '/' + `${commentId}`).catch(function (error) {
        return error.response 
    })
}

export default {
    userLogin,
    hrLogin,
    createUser,
    createHr,
    getPost,
    getPostByUser,
    getPostComment,
    getAdComment,
    getAd,
    getAdByHr,
    deleteAd,
    createPost,
    createPostCommentByUser,
    createPostCommentByHr,
    createAdCommentByUser,
    createAdCommentByHr,
    createAd,
    deletePost,
    deleteCommentByHr,
    deleteCommentByUser,
    getPopularPost,
    getPopularAd,
    uploadUserAvatar,
    uploadHrAvatar
}