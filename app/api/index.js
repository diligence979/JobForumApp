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
    });
}

const getPost = async (page) => {
    return axios.get(host + post + '?offset=' + `${page}`).catch(function (error) {
        return error.response 
    });
}

export default {
    userLogin,
    createUser,
    getPost
}