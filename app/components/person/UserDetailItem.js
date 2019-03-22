import React, { Component } from 'react'
import {
    View,
    Text,
} from 'react-native'
import PropTypes from 'prop-types'
import ImagePicker from 'react-native-image-picker'
import styles from '../../style'
import { Avatar, Badge } from 'react-native-elements'
import * as Constant from '../../style/constant'
import * as Config from '../../config/config'
import ownerActions from '../../store/actions/owner'

const options = {
    title: '上传头像',
    maxWidth: 60,
    maxHeight: 60, 
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
}

/**
 * “我的”页面头部
 */
class UserDetailItem extends Component {
    constructor(props) {
        super(props)
        this.openImagePicker = this.openImagePicker.bind(this)
    }

    openImagePicker(ownerId, username, role) {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response)
            if (response.didCancel) {
              console.log('User cancelled image picker')
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton)
            } else {
                if (response && response.data) {
                    let avatar = response.data
                    if (role) {
                        // HR upload avatar
                        ownerActions.uploadHrAvatar(ownerId, username, avatar, role, (res) => {
                            if (res.result) {
                                this.props.refresh && this.props.refresh()
                            }
                        })
                    } else {
                        // USER upload avatar
                        ownerActions.uploadUserAvatar(ownerId, username, avatar, role, (res) => {
                            if (res.result) {
                                this.props.refresh && this.props.refresh()
                            }
                        })
                    }
                }
            }
        })
    }

    render() {
        let { ownerId, role, username, avatar } = this.props.ownerInfo
        avatar = (avatar) ? (Config.BASE_64 + avatar) : ''
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
                                source={{
                                    uri: avatar
                                }}
                                showEditButton
                                size="large"
                                rounded
                                title="HR"
                                onPress={() => {
                                    this.openImagePicker(ownerId, username, role)
                                }}
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
    ownerInfo: PropTypes.object,
    refresh: PropTypes.func
}

export default UserDetailItem