import { AsyncStorage } from 'react-native'
import { USER } from '../type'
import UserDao from '../../dao/userDao'
import store from '../'
// import RepositoryDao from "../../dao/repositoryDao";
// import Api from "../../net";
// import Address from "../../net/address";
import * as Constant from '../../style/constant'

const { dispatch, getState } = store;

/**
 * 初始化用户信息
 */
const initUserInfo = async () => {
    let token = await AsyncStorage.getItem(Constant.TOKEN_KEY);
    let res = await UserDao.getUserInfoLocal();
    if (res && res.result && token) {
        // dispatch({
        //     type: USER.USER_INFO,
        //     res: res.data
        // });
    }
    return {
        result: res.result && (token !== null),
        data: res.data
    };
};

export default {
    initUserInfo
}