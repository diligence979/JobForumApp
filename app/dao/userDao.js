import { AsyncStorage } from 'react-native'
import * as Constant from '../style/constant'
// import Api from '../net'
// import Address from '../net/address'
// import realm from './db'


/**
 * 获取本地登录用户信息
 */
const getUserInfoLocal = async () => {
    let userText = await AsyncStorage.getItem(Constant.USER_INFO);
    if (userText) {
        let res = JSON.parse(userText);
        return {
            result: true,
            data: res
        } 
    } else {
        return {
            result: false
        }
    }
};

export default {
    getUserInfoLocal
}