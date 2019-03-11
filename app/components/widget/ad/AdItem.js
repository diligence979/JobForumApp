import React, { Component } from 'react'
import {
    View, 
    Text, 
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'
import styles from '../../../style'
import * as Constant from '../../../style/constant'
import TimeText from '../TimeText'
import UserImage from '../UserImage'
import Icon from 'react-native-vector-icons/Feather'

class AdItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { company, created_at, job, education, location, salary, comment_size, showDelete } = this.props
        let commentSize = (!showDelete) ? 
            <View style={[styles.flexDirectionRowNotFlex]}>
                <Text style={[styles.flex, styles.smallText, {
                    fontWeight: "100",
                    color: "grey",
                    textAlign: "right"
                }]}>
                    <Icon name="message-square" size={14} />
                    {' ' + comment_size}
                </Text>
            </View> : 
            <View style={[styles.flexDirectionRowNotFlex, styles.justifyEnd]}>
                <Button
                    icon={
                      <Icon name="trash-2" size={14}/>
                    }
                    buttonStyle={{
                        backgroundColor: "transparent",
                    }}
                    onPress={() => {
                        this.props.deleteItem && this.props.deleteItem()
                    }}
                />
            </View>
        return(
            <TouchableOpacity
                style={[styles.shadowCard, {
                    backgroundColor: Constant.cardBackgroundColor,
                    marginTop: Constant.normalMarginEdge / 2,
                    marginLeft: Constant.normalMarginEdge,
                    marginRight: Constant.normalMarginEdge,
                    marginBottom: Constant.normalMarginEdge / 2,
                    padding: Constant.normalMarginEdge,
                }]}
                onPress={() => {
                    this.props.onPressItem && this.props.onPressItem()
                }}
            >
                {/* 公司 */}
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginBottom: Constant.normalMarginEdge
                }]}>
                    <View style={[styles.flex, styles.centerH, styles.flexDirectionRowNotFlex]}>
                        <Text style={[styles.flex, styles.smallText, {
                            fontWeight: "bold",
                            fontSize: 16
                        }]}>
                            {company}
                        </Text>
                        <TimeText style={[styles.subSmallText,{marginTop: 0}]}
                                  time={created_at}/>
                    </View>
                </View>
                {/* 岗位 */}
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginBottom: Constant.normalMarginEdge
                }]}>
                    <Icon name="paperclip" size={16} color="#959595" style={{
                        marginRight: Constant.normalMarginEdge
                    }}/>
                    <Text style={[styles.flex, styles.smallText]}>
                        {job}
                    </Text>
                </View>
                {/* 学历 */}
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginBottom: Constant.normalMarginEdge
                }]}>
                    <Icon name="book" size={16} color="#959595" style={{
                        marginRight: Constant.normalMarginEdge
                    }}/>
                    <Text style={[styles.flex, styles.smallText]}>
                        {education}
                    </Text>
                </View>
                {/* 工作地点 */}
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginBottom: Constant.normalMarginEdge
                }]}>
                    <Icon name="map-pin" size={16} color="#959595" style={{
                        marginRight: Constant.normalMarginEdge
                    }}/>
                    <Text style={[styles.flex, styles.smallText]}>
                        {location}
                    </Text>
                </View>
                {/* 薪水 */}
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginBottom: Constant.normalMarginEdge
                }]}>
                    <Icon name="award" size={16} color="#959595" style={{
                        marginRight: Constant.normalMarginEdge
                    }}/>
                    <Text style={[styles.flex, styles.smallText]}>
                        {salary}
                    </Text>
                </View>
                {/* 评论数 */}
                {commentSize}
            </TouchableOpacity>
        )
    }
}

AdItem.propTypes = {
    company: PropTypes.string,
    created_at: PropTypes.string,
    job: PropTypes.string,
    location: PropTypes.string,
    salary: PropTypes.string,
    education: PropTypes.string,
    comment_size: PropTypes.number,
    showDelete: PropTypes.bool,
    onPressItem: PropTypes.func,
    deleteItem: PropTypes.func
}

export default AdItem