import React from 'react'
import {
    Scene,
    Router,
    Lightbox
} from 'react-native-router-flux'

import LoginPage from './components/LoginPage'
import WelcomePage from './components/WelcomePage'

import DynamicPage from './components/DynamicPage'
import TrendPage from './components/TrendPage'
import MyPage from './components/MyPage'

import PostDetailPage from './components/post/PostDetailPage'
import AdDetailPage from './components/ad/AdDetailPage'
import SettingPage from './components/SettingPage'

import TabIcon from './components/widget/TabIcon'
import LoadingModal from './components/widget/LoadingModal'
import SettingButton from './components/widget/CustomSettingButton'
import CustomBackButton from './components/widget/CustomBackButton'
import CommonOptionModal from './components/widget/CommonOptionModal'
import TextInputModal from './components/widget/CommonTextInputModal'

import styles from './style'
import * as Constant from "./style/constant"


/**
 * 全局路由
 */
const getRouter = () => {
    return (
        <Router
            sceneStyle={() => {
                return styles.routerStyle
            }}>
            <Lightbox>
                <Scene key="main">
                    <Scene key="WelcomePage" component={WelcomePage} hideNavBar hideTabBar hide/>
                </Scene>
                <Scene key="LoginPage" component={LoginPage} showLabel={false} hideNavBar/>
                <Scene key="root" 
                    navigationBarStyle={styles.navigationBar}
                    titleStyle={{color: Constant.titleTextColor}}>
                    <Scene key="mainTabPage"
                           tabs
                           lazy
                           wrap={false}
                           showLabel={false}
                           tabBarPosition={"bottom"}
                           title={'求职论坛'}
                           renderRightButton={
                               () => <SettingButton/>
                           }
                           tabBarStyle={[styles.centered, {
                               height: Constant.tabBarHeight,
                               backgroundColor: Constant.tabBackgroundColor
                           }]}>
                        <Scene
                            key="DynamicPage"
                            component={DynamicPage}
                            icon={TabIcon}
                            title={'动态'}
                            tabIconName={'tabDynamic'}
                        />
                        <Scene
                            key="TrendPage"
                            component={TrendPage}
                            icon={TabIcon}
                            title={'推荐'}
                            tabIconName={'tabRecommended'}
                        />
                        <Scene
                            key="MyPage"
                            component={MyPage}
                            icon={TabIcon}
                            title={'我的'}
                            tabIconName={'tabMy'}
                        />
                    </Scene>
                    <Scene 
                        key="PostDetailPage" 
                        component={PostDetailPage}
                        iconType={2}
                        renderLeftButton={() => <CustomBackButton />}
                    />
                    <Scene
                        key="AdDetailPage"
                        component={AdDetailPage}
                        iconType={2}
                        renderLeftButton={() => <CustomBackButton />}
                    />
                    <Scene 
                        key="SettingPage" 
                        component={SettingPage} 
                        title={'设置'}
                        iconType={2}
                        renderLeftButton={() => <CustomBackButton />}
                    />
                </Scene>
                <Scene key="LoadingModal" component={LoadingModal}/>
                <Scene key="OptionModal" component={CommonOptionModal}/>
                <Scene key="TextInputModal" component={TextInputModal}/>
            </Lightbox>
        </Router>
    )
}

export default getRouter