import { Actions } from 'react-native-router-flux'
import store from '../store';


export const postUtil = (rowData) => {
    let ownerId = store.getState().user.userInfo.userId
    console.log('dadfakfd', ownerId)
    Actions.PostDetailPage({
        rowData: rowData,
        ownerId: ownerId
    })
}

export const adUtil = (rowData) => {
    Actions.AdDetailPage({rowData: rowData})
}
