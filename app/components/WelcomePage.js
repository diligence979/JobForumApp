import React, { Component } from 'react' 
import {
    View, 
    Image, 
    StatusBar, 
    Animated, 
    Easing
} from 'react-native' 
import { Actions } from 'react-native-router-flux' 
import styles, { screenHeight, screenWidth } from "../style"
import loginActions from '../store/actions/login'
import ownerActions from '../store/actions/owner'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LottieView from 'lottie-react-native' 
import * as Constant from "../style/constant"

/**
 * 欢迎页
 *
 * @class WelcomePage
 * @extends {Component}
 */
class WelcomePage extends Component {
    constructor(props) {
        super(props) 
        this.toNext = this.toNext.bind(this) 
        this.state = {
            progress: new Animated.Value(0),
        } 
    }

    componentDidMount() {
        // 是否登陆，是否用户信息
        ownerActions.initOwnerInfo().then((res) => {
            this.toNext(res) 
        }) 
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
        }).start() 
    }

    componentWillUnmount() {
        if (this.refs.lottieView) {
            this.refs.lottieView.reset() 
        }
    }

    toNext(res) {
        setTimeout(() => {
            if (res && res.result) {
                Actions.reset("root") 
            } else {
                Actions.reset("LoginPage") 
            }
        }, 2100) 
    }

    render() {
        return (
            <View style={[styles.mainBox, {backgroundColor: Constant.white}]}>
                <StatusBar hidden={true}/>
                <View style={[styles.centered, {flex: 1}]}>
                    <Image source={require("../img/welcome.png")}
                           resizeMode={"contain"}
                           style={{width: screenWidth, height: screenHeight}}/>
                    <View style={[styles.absoluteFull, styles.centered, {justifyContent: "flex-end"}]}>
                        <View style={[styles.centered, {width: 150, height:150}]}>
                            <LottieView
                                ref="lottieView"
                                style={{
                                    width: 150,
                                    height: 150,
                                }}
                                source={require('../style/lottie/animation-w800-h800.json')}
                                progress={this.state.progress}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(state => ({
    state
}), dispatch => ({
    actions: bindActionCreators(loginActions, dispatch),
}))(WelcomePage)