import React from 'react';
import { TabNavigator } from 'react-navigation';
import { theme } from '../../../config/themes';
import AlertsView from './AlertsView'
import MessagesView from './MessagesView'
import Ionicon from 'react-native-vector-icons/Ionicons';


const AlertsTabNavigator = TabNavigator({
    AlertsView: {
        screen:AlertsView,
        navigationOptions: {
            tabBarLabel: 'Alerts',
        }
    },
    MessagesView:{
        screen:MessagesView,
        navigationOptions: {
            tabBarLabel: 'Messages',
        }
    }
},{
    
    animationEnabled: false,
    swipeEnabled: false,
    lazyLoad:true,
    tabBarPosition: 'top',
    tabBarOptions:{
        activeTintColor: theme.ICON_SELECTED_COLOR,
        inactiveTintColor: theme.ICON_DEFAULT_COLOR,
        upperCaseLabel: false,
        showLabel:true,
        labelStyle: {
            fontSize: 22,
            marginTop:0,
            marginBottom:0,
        },
        tabStyle: {
            justifyContent:'center',
            alignItems:'center'   
        },
        style:{
            backgroundColor:theme.TAB_BAR_BACKGROUND_COLOR,
            // Tab navigator not showing up due to the css below
            //justifyContent:'center',
            //alignItems:'center',
        },
        indicatorStyle:{
            backgroundColor:theme.ICON_SELECTED_COLOR
        }
    }
});

export default AlertsTabNavigator;