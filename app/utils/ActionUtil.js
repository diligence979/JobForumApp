import { Actions } from 'react-native-router-flux'


export const postUtil = (rowData) => {
    Actions.PostDetailPage({rowData: rowData})
}

export const adUtil = (rowData) => {
    Actions.AdDetailPage({rowData: rowData})
}
