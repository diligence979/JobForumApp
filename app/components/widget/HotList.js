import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, ListItem } from 'react-native-elements'
import { postUtil, adUtil } from '../../utils/actionUtil'
import * as Constant from '../../style/constant'
import * as Config from '../../config/config'

/**
 * 热门贴组件
 *
 * @class HotList
 * @extends {Component}
 */
class HotList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let avatar = ''
        let title = ''
        let subtitle = ''
        let isPost = this.props.isPost
        return (
            <Card title={isPost ? "热门讨论贴" : "热门招聘贴"}
                containerStyle={{
                    borderWidth: 0,
                    marginTop: Constant.normalMarginEdge / 2,
                    marginLeft: Constant.normalMarginEdge,
                    marginRight: Constant.normalMarginEdge,
                    marginBottom: Constant.normalMarginEdge / 2,
                    padding: Constant.normalMarginEdge,
                }}
                dividerStyle={{
                    display: "none"
                }}
            >
            {
                this.props.hotList.map((item, i) => {
                    avatar = isPost ? item.user.avatar : item.hr.avatar
                    title = isPost ? item.title : item.job
                    subtitle = isPost ? item.user.username : item.company
                    if (avatar) {
                        return (
                            <ListItem
                                key={i}
                                roundAvatar
                                bottomDivider
                                title={title}
                                chevron
                                chevronColor="white"
                                titleStyle={{
                                    fontSize: 14,
                                    maxHeight: 16
                                }}
                                subtitleStyle={{
                                    fontSize:12,
                                    color: "#959595"
                                }}
                                subtitle={subtitle}
                                containerStyle={[{
                                    flexWrap: "nowrap",
                                    padding: 5
                                }]}
                                badge={{value: `${item.comment_size}`, badgeStyle:{
                                    backgroundColor: "#fe180d"
                                }}}
                                onPress={() => {
                                    (isPost) ? postUtil(item) : adUtil(item)
                                }}
                                leftAvatar={{
                                    source: { uri: Config.BASE_64 + avatar }
                                }}
                            />
                        )
                    } else {
                        return (
                            <ListItem
                                key={i}
                                roundAvatar
                                bottomDivider
                                title={title}
                                chevron
                                chevronColor="white"
                                titleStyle={{
                                    fontSize: 14,
                                    maxHeight: 16
                                }}
                                subtitleStyle={{
                                    fontSize:12,
                                    color: "#959595"
                                }}
                                subtitle={subtitle}
                                containerStyle={[{
                                    flexWrap: "nowrap",
                                    padding: 5
                                }]}
                                badge={{value: `${item.comment_size}`, badgeStyle:{
                                    backgroundColor: "#fe180d"
                                }}}
                                onPress={() => {
                                    (isPost) ? postUtil(item) : adUtil(item)
                                }}
                                leftAvatar={{
                                    source: require('../../img/mypic.jpg')
                                }}
                            />
                        )
                    }
                })
            }
            </Card>
        )
    }
}

HotList.propTypes = {
    hotList: PropTypes.array,
    isPost: PropTypes.bool
}

export default HotList