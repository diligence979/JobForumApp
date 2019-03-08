import { Actions } from 'react-native-router-flux'
import store from '../store';


export const postUtil = (rowData) => {
    let ownerInfo = store.getState().owner.ownerInfo
    Actions.PostDetailPage({
        rowData: rowData,
        ownerInfo: ownerInfo
    })
}

export const adUtil = (rowData) => {
    let ownerInfo = store.getState().owner.ownerInfo
    Actions.AdDetailPage({
        rowData: rowData,
        ownerInfo: ownerInfo
    })
}
