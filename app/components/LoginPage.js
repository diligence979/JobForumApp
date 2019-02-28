import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    Image,
    StatusBar,
    BackHandler,
    Keyboard,
    Easing
} from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modalbox';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconC from 'react-native-vector-icons/Entypo';
import { Fumi } from 'react-native-textinput-effects';
import loginActions from '../store/actions/login'
import Toast from './common/ToastProxy'
import styles, { screenHeight, screenWidth } from "../style"
import * as Constant from "../style/constant"

const animaTime = 600;

/**
 * 登陆Modal
 */
class LoginPage extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.userInputChange = this.userInputChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.toLogin = this.toLogin.bind(this);
        this.params = {
            userName: '',
            password: ''
        };
        this.state = {
            saveUserName: '',
            savePassword: '',
            secureTextEntry: true,
            secureIcon: "eye-with-line",
            opacity: new Animated.Value(0),
            progress: new Animated.Value(0),
        }
        this.thisUnmount = false;
    }

    componentDidMount() {
        this.onOpen();
        this.handle = BackHandler.addEventListener('hardwareBackPress-LoginPage', this.onClose)
        Animated.timing(this.state.opacity, {
            duration: animaTime,
            toValue: 1,
        }).start();
        this.startAnimation();
    }

    componentWillUnmount() {
        this.thisUnmount = true;
        if (this.handle) {
            this.handle.remove();
        }
        if (this.refs.lottieView) {
            this.refs.lottieView.reset();
        }
    }

    startAnimation() {
        if (this.thisUnmount) {
            return;
        }
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear
        }).start(({finished}) => {
            // if (!finished) {
            //     return;
            // }
            // //重复播放
            // this.setState({
            //     progress: new Animated.Value(0),
            // });
            // this.startAnimation()
        });
    }

    onOpen() {
        loginActions.getLoginParams().then((res) => {
            this.setState({
                saveUserName: res.userName,
                savePassword: res.password
            });
            this.params.userName = res.userName;
            this.params.password = res.password;
        });
    }

    onClose() {
        if (Actions.state.index === 0) {
            return false;
        }
        Animated.timing(this.state.opacity, {
            duration: animaTime,
            toValue: 0,
        }).start(Actions.pop());
        return true;
    }

    userInputChange(text) {
        this.params.userName = text;
    }

    passwordChange(text) {
        this.params.password = text;
    }

    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    toLogin() {
        let { login } = this.props;
        if (!this.params.userName || this.params.userName.length === 0) {
            Toast('请输入用户名！');
            return
        }
        if (!this.params.password || this.params.password.length === 0) {
            Toast('请输入密码！');
            return
        }
        this.setState({
            saveUserName: this.params.userName,
            savePassword: this.params.password
        });
        Actions.LoadingModal({backExit: false});
        Keyboard.dismiss();
        login.doLogin(this.params.userName, this.params.password, (res) => {
            this.exitLoading();
            if (!res.code) {
                Toast('登录失败！');
            } else {
                Actions.reset("root");
            }
        })
    }

    toRegister() {
        let { login } = this.props;
        if (!this.params.userName || this.params.userName.length === 0) {
            Toast('请输入用户名！');
            return
        }
        if (!this.params.password || this.params.password.length === 0) {
            Toast('请输入密码！');
            return
        }
        this.setState({
            saveUserName: this.params.userName,
            savePassword: this.params.password
        });
        Actions.LoadingModal({backExit: false});
        Keyboard.dismiss();
        login.doRegister(this.params.userName, this.params.password, (res) => {
            console.log(res);
            if (!res.code) {
                Toast(res.msg)
            } else {
                Actions.reset("root");
            }
        })
    }

    render() {
        let textInputProps = {
            style: {width: 250, height: 70, backgroundColor: Constant.miWhite},
            activeColor: Constant.primaryColor,
            passiveColor: '#dadada',
            iconClass: Icon,
            iconColor: Constant.primaryColor,
            iconSize: 25,
            clearButtonMode: "always"
        };
        return (
            <Animated.View
                style={[styles.centered, styles.absoluteFull, {backgroundColor: Constant.primaryColor}, {opacity: this.state.opacity}]}>
                <StatusBar hidden={false} backgroundColor={Constant.primaryColor} translucent
                           barStyle={'light-content'}/>
                <View style={[styles.absoluteFull, {zIndex: -999, justifyContent: 'flex-end'}]}>
                    <View style={{width: screenWidth, height: screenHeight / 2}}>
                        <LottieView
                            ref="lottieView"
                            style={{width: screenWidth, height: screenHeight / 2}}
                            source={require('../style/lottie/animation-login.json')}
                            progress={this.state.progress}
                        />
                    </View>
                </View>
                <View
                    style={[{backgroundColor: Constant.miWhite}, {
                        height: 360,
                        width: screenWidth - 80,
                        margin: 50,
                        borderRadius: 10
                    }]}
                    onClosed={this.onClose}
                    onOpened={this.onOpen}>
                    <View style={[styles.centered, {marginTop: Constant.normalMarginEdge}]}>
                        <Image source={require("../img/logo.png")}
                               resizeMode={"contain"}
                               style={{width: 80, height: 80}}/>
                    </View>
                    <View style={[styles.centered, {marginTop: Constant.normalMarginEdge}]}>
                        <Fumi
                            ref={"userNameInput"}
                            {...textInputProps}
                            label={'用户名'}
                            iconName={'user-circle-o'}
                            value={this.state.saveUserName}
                            onChangeText={this.userInputChange}
                        />
                    </View>
                    <View style={[styles.centered, {marginTop: Constant.normalMarginEdge}]}>
                        <Fumi
                            ref={"passwordInput"}
                            {...textInputProps}
                            label={'密码'}
                            returnKeyType={'send'}
                            secureTextEntry={this.state.secureTextEntry}
                            password={this.state.secureTextEntry}
                            iconName={'keyboard-o'}
                            value={this.state.savePassword}
                            onChangeText={this.passwordChange}
                        />
                        <View style={[{
                            position: "absolute",
                            left: screenWidth - 150,
                            right: 2 * Constant.normalMarginEdge,
                            zIndex: 12,
                        }, styles.alignItemsEnd]}>
                            <TouchableOpacity 
                                style={[styles.centered, {
                                    marginTop: Constant.normalMarginEdge,
                                    padding: Constant.normalMarginEdge
                                }]}
                                onPress={() => {
                                    this.setState({
                                        saveUserName: this.params.userName,
                                        savePassword: this.params.password,
                                        secureIcon: (this.state.secureTextEntry) ? "eye" : "eye-with-line",
                                        secureTextEntry: !this.state.secureTextEntry,
                                    });
                                }}>
                                <IconC name={this.state.secureIcon}
                                       backgroundColor={Constant.transparentColor}
                                       color={Constant.primaryColor} size={13}
                                       style={styles.centered}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                    </View>
                    <TouchableOpacity 
                        style={[styles.centered, {marginTop: Constant.normalMarginEdge}]}
                        onPress={() => {
                            this.toLogin();
                        }}>
                        <View
                            style={[styles.centered, {
                                backgroundColor: Constant.primaryColor,
                                width: 230,
                                paddingHorizontal: Constant.normalMarginEdge,
                                paddingVertical: Constant.normalMarginEdge,
                                borderRadius: 5
                            }]}>
                            <Text style={[styles.normalTextWhite]}>{'登陆'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.centered, {marginTop: Constant.normalMarginEdge}]}
                                      onPress={() => {
                                          this.toRegister();
                                      }}>
                        <View
                            style={[styles.centered, {
                                backgroundColor: Constant.primaryColor,
                                width: 230,
                                paddingHorizontal: Constant.normalMarginEdge,
                                paddingVertical: Constant.normalMarginEdge,
                                borderRadius: 5
                            }]}>
                            <Text style={[styles.normalTextWhite]}>{'注册'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }
}

export default connect(state => ({
    state
}), dispatch => ({
    login: bindActionCreators(loginActions, dispatch)
}))(LoginPage)