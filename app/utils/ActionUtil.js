import { Actions } from 'react-native-router-flux'
import store from '../store';


export const postUtil = (rowData) => {
    let ownerId = store.getState().user.userInfo.userId
    Actions.PostDetailPage({
        rowData: rowData,
        ownerId: ownerId
    })
}

export const adUtil = (rowData) => {
    let ownerId = store.getState().user.userInfo.userId
    Actions.AdDetailPage({
        rowData: rowData,
        ownerId: ownerId
    })
}
