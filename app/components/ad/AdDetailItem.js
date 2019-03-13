import React, { Component } from 'react' 
import {
    View,
    Text
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'
import TimeText from '../widget/TimeText'
import * as Constant from '../../style/constant'
import styles from '../../style'

/**
 * 招聘帖详情页头部的详情部分
 *
 * @class AdDetailItem
 * @extends {Component}
 */
class AdDetailItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { 
            company,
            created_at,
            job,
            education,
            location,
            salary,
            team,
            jd,
            email,
            comment_size
         } = this.props
        return (
            <View
                style={[{
                    marginTop: Constant.normalMarginEdge / 2,
                    marginBottom: Constant.normalMarginEdge / 2,
                    padding: Constant.normalMarginEdge,
                    borderRadius: 4,
                }]}
            >
                {/* 公司 */}
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginBottom: Constant.normalMarginEdge
                }]}>
                    <View style={[styles.flex, styles.centerH, styles.flexDirectionRowNotFlex]}>
                        <Text style={[styles.flex, styles.smallText, {
                            fontWeight: "bold",
                            fontSize: 20
                        }]}>
                            {company}
                        </Text>
                        <TimeText style={[styles.subSmallText,{marginTop: 0}]}
                                  time={created_at}/>
                    </View>
                </View>
                {/* 团队 */}
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginBottom: Constant.normalMarginEdge
                }]}>
                    <Icon name="users" size={16} color="#959595" style={{
                        marginRight: Constant.normalMarginEdge
                    }}/>
                    <Text style={[styles.flex, styles.smallText]}>
                        团队：{team}
                    </Text>
                </View>
                {/* 岗位 */}
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginBottom: Constant.normalMarginEdge
                }]}>
                    <Icon name="paperclip" size={16} color="#959595" style={{
                        marginRight: Constant.normalMarginEdge
                    }}/>
                    <Text style={[styles.flex, styles.smallText]}>
                        岗位：{job}
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
                        学历：{education}
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
                        地点：{location}
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
                        待遇：{salary}
                    </Text>
                </View>
                {/* 邮箱 */}
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginBottom: Constant.normalMarginEdge
                }]}>
                    <Icon name="mail" size={16} color="#959595" style={{
                        marginRight: Constant.normalMarginEdge
                    }}/>
                    <Text style={[styles.flex, styles.smallText]}>
                        邮箱：{email}
                    </Text>
                </View>
                {/* 岗位职责 */}
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginBottom: Constant.normalMarginEdge * 2
                }]}>
                    <Icon name="user-plus" size={16} color="#959595" style={{
                        marginRight: Constant.normalMarginEdge
                    }}/>
                    <Text style={[styles.flex, styles.smallText]}>
                        岗位职责：
                    </Text>
                </View>
                <View style={[styles.flexDirectionRowNotFlex, {
                    padding: Constant.normalMarginEdge,
                    borderRadius: 10,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "#EEE9E9"
                }]}>
                        <Text style={[styles.flex, styles.smallText]}>
                            {jd}
                        </Text>
                    </View>
                {/* 评论数 */}
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginTop: Constant.normalMarginEdge * 5
                }]}>
                    <Text style={{
                        color: "#959595",
                        fontSize: 12,
                    }}>
                        {comment_size}条评论
                        <Icon name="chevrons-down" size={12} />
                    </Text>
                </View>
            </View>
        )
    }
}

AdDetailItem.propTypes = {
    user: PropTypes.object,
    count: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string
}

export default AdDetailItem