import { Actions } from 'react-native-router-flux'


export const ActionUtils = (rowData) => {
    Actions.PostDetail({rowData: rowData})
}

