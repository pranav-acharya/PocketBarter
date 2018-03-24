import React from 'react';
import { StyleSheet,Platform, Text, ScrollView } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import MessagesView from './alerts/MessagesView'
import AlertsTabNavigator from './alerts/AlertsRouter'
import AllProductsView from './AllProductsView'
import SavedProductsView from './SavedProductsView'
import LoggedInUserView from './LoggedInUserView'
import UserView from './UserView'
import AddNewProductView from './AddNewProductView'
import ChatView from './ChatView'
import ProductDetailView from './ProductDetailView'
import FilterModal from './FilterModal'
import CalendarModal from './CalendarModal'
import { theme } from '../../config/themes'

import Ionicon from 'react-native-vector-icons/Ionicons';
import NotificationIcon from './NotificationIcon';

const tabBarIconSize = 38;

const HomeViewTabNavigator = TabNavigator({
    AllProductsView: {
        screen: AllProductsView,
        navigationOptions: {
            tabBarLabel: 'All',
            tabBarIcon: ({ tintColor }) => <Ionicon name="ios-search-outline" color={tintColor} size={tabBarIconSize} style={styles.tabBarIcon} /> 
        }
    },
    SavedProductsView: {
        screen: SavedProductsView,
        navigationOptions: {
            tabBarLabel: 'Saved',
            tabBarIcon: ({ tintColor }) => <Ionicon name="ios-heart-outline" color={tintColor} size={tabBarIconSize} style={styles.tabBarIcon}/>
        },
    },
    LoggedInUserView: {
        screen: LoggedInUserView,
        navigationOptions:{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => <Ionicon name="ios-contact-outline" color={tintColor} size={tabBarIconSize} style={styles.tabBarIcon}/>
        }
    },
    AlertsTabNavigator: {
        screen: AlertsTabNavigator,
        navigationOptions: {
            tabBarLabel: 'Alerts',
            tabBarIcon: ({ tintColor }) => <NotificationIcon color={tintColor} size={tabBarIconSize}/>
            
        },
    },
},{
    animationEnabled: true,
    swipeEnabled: false,
    lazy:true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        tabStyle:{
            paddingBottom:Platform.OS==='ios'?5:0
        },
        showLabel:false,
        activeTintColor: theme.ICON_SELECTED_COLOR,
        showIcon: true,
        upperCaseLabel: false,
        inactiveTintColor: theme.ICON_DEFAULT_COLOR,
        style:{
            backgroundColor:theme.TAB_BAR_BACKGROUND_COLOR,
            shadowColor: theme.TAB_BAR_SHADOW_COLOR,
            shadowOffset: {width: 2, height: 5},
            shadowOpacity: 0.9,
            shadowRadius: 1,
            elevation: 10,
            height:60,
        },
        iconStyle: {
            width: tabBarIconSize,
            height: tabBarIconSize,
        },
        indicatorStyle:{
            backgroundColor:theme.ICON_SELECTED_COLOR
        }
    },
  
});



const HomeViewStackNavigator = StackNavigator({
    HomeViewTabNavigator: {
        screen: HomeViewTabNavigator
    },
    UserView:{ 
        screen: UserView
    },
    AddNewProductView:{
        screen: AddNewProductView
    },
    ProductDetailView: {
        screen: ProductDetailView
    },
    ChatView: {
        screen: ChatView
    },
    Filter: {
        screen: FilterModal,
    },
    Calendar:{
        screen: CalendarModal
    },
}, 
{
    mode:'card',
    headerMode: 'none',
    transitionConfig: () => ({
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [layout.initWidth, 0, 0]
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                outputRange: [0, 1, 1, 0.3, 0]
            });

            return { opacity, transform: [{ translateX }] }
        }
    })
  
});

const styles = StyleSheet.create({
    tabBarIcon:{
        height:tabBarIconSize,
        width:tabBarIconSize,
    }, 
    container: {
        flex: 1,
    },
});

export default HomeViewStackNavigator;