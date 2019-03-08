import React, { Component } from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'
import PropTypes from 'prop-types'
import styles from '../../../style'
import { Avatar, Badge } from 'react-native-elements'
import * as Constant from '../../../style/constant'


/**
 * 用户页面头部
 */
class UserDetailItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { ownerId, role, username } = this.props.ownerInfo
        let roleText = role ? 'HR' : "求职者"
        return (
            <View>
                <View style={[{
                    paddingHorizontal: Constant.normalMarginEdge,
                    paddingTop: 2 * Constant.normalMarginEdge,
                    backgroundColor: Constant.primaryColor,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 1,
                        height: 2
                    },
                    shadowOpacity: 0.7,
                    shadowRadius: 5,
                    borderBottomRightRadius: 2,
                    borderBottomLeftRadius: 2,
                    elevation: 2,
                }]}>
                    <View style={[styles.flexDirectionRowNotFlex, styles.justifyCenter, {
                        marginBottom: Constant.normalMarginEdge * 2,
                    }]}>
                        <View style={[{
                            height: Constant.largeIconSize,
                            width: Constant.largeIconSize,
                        }]}>
                            <Avatar
                                source={require('../../../img/mypic.jpg')}
                                showEditButton
                                size="large"
                                rounded
                                title="HR"
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
                            
                        </View>         
                    </View>
                    <View style={[styles.flexDirectionRowNotFlex, styles.justifyCenter, styles.centerH, {
                        marginBottom: Constant.normalMarginEdge * 2,
                    }]}>
                        <Text selectable={true} style={[styles.largeTextWhite, {
                            fontWeight: "bold"
                        }]}>{username}</Text>
                        <Badge
                            status="primary"
                            value={roleText}
                            containerStyle={{ position: 'relative', right: -4, top: 2 }}
                            badgeStyle={{backgroundColor: '#aaaaaa'}}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

UserDetailItem.propTypes = {
    ownerInfo: PropTypes.object
}

export default UserDetailItem