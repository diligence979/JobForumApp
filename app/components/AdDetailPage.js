import React, { Component } from 'react'
import {
    View,
    StatusBar
} from 'react-native'
import PropTypes from 'prop-types'
import AdDetail from './widget/ad/AdDetail'
import styles from '../style'

class AdDetailPage extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        let { rowData, ownerId } = this.props
        let { id } = rowData
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} 
                           backgroundColor={'transparent'} 
                           translucent 
                           barStyle={'light-content'}/>
                <AdDetail 
                    type={'ad'}
                    id={id}
                    adInfo={rowData}
                    ownerId={ownerId}
                />
            </View>
        )
    }
}

AdDetailPage.propTypes = {
    rowData: PropTypes.object
}

export default AdDetailPage