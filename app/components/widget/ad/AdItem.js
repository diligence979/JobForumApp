import React, { Component } from 'react'
import {
    View, 
    Text, 
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
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
        let { company, created_at, job, education, location, salary } = this.props
        let bottomDes = (this.props.des) ?
            <Text style={[styles.subSmallText,
                {marginTop: Constant.normalMarginEdge,}]}
                  numberOfLines={Constant.normalNumberOfLine}>
                {this.props.des}
            </Text> : <View/>
        return(
            // <View>
            //     <Text>xxxx</Text>
            // </View>
            <TouchableOpacity
                style={[{
                    marginTop: Constant.normalMarginEdge / 2,
                    marginLeft: Constant.normalMarginEdge,
                    marginRight: Constant.normalMarginEdge,
                    marginBottom: Constant.normalMarginEdge / 2,
                    padding: Constant.normalMarginEdge,
                    borderRadius: 4,
                }, styles.shadowCard]}
                onPress={() => {
                    this.props.onPressItem && this.props.onPressItem()
                }}
            >
                <View style={[styles.flexDirectionRowNotFlex, {
                    marginBottom: Constant.normalMarginEdge
                }]}>
                    <View style={[styles.flex, styles.centerH, styles.flexDirectionRowNotFlex]}>
                        <Text style={[styles.flex, styles.smallText, {
                            fontWeight: "bold",
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
    education: PropTypes.string
}

export default AdItem