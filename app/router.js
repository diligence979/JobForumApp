import React, { Component } from 'react';
import {
    Scene,
    Router,
    Lightbox, 
    Drawer
} from 'react-native-router-flux';

import LoginPage from './components/LoginPage'
import WelcomePage from './components/WelcomePage'
import DynamicPage from './components/DynamicPage'
import TrendPage from './components/TrendPage'
import MyPage from './components/MyPage'
import TabIcon from './components/widget/TabIcon'
import LoadingModal from './components/common/LoadingModal'
import CustomBackButton from './components/widget/CustomBackButton'
import PostDetail from './components/PostDetailPage'

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
                <Scene key="LoginPage" component={LoginPage}/>
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
                           tabBarStyle={{
                               height: Constant.tabBarHeight,
                               alignItems: 'center',
                               justifyContent: 'center',
                               backgroundColor: Constant.tabBackgroundColor
                           }}>
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
                            component={DynamicPage}
                            icon={TabIcon}
                            title={'我的'}
                            tabIconName={'tabMy'}
                        />
                    </Scene>
                    <Scene key="PostDetail" component={PostDetail}
                           iconType={2}
                           renderLeftButton={() => <CustomBackButton />}
                    />
                </Scene>
                <Scene key="LoadingModal" component={LoadingModal}/>
            </Lightbox>
        </Router>
    )
};


export default getRouter;