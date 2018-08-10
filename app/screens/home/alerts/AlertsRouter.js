import React from 'react';
import { TabNavigator } from 'react-navigation';
import { theme } from '../../../config/themes';
import AlertsView from './AlertsView'
import MessagesView from './MessagesView'
import IncomingProductRequestsBadge from './IncomingProductRequestsBadge'
import IncomingProductRequestsView from './IncomingProductRequestsView'
import OutgoingProductRequestsBadge from './OutgoingProductRequestsBadge'
import OutgoingProductRequestsView from './OutgoingProductRequestsView'

import Ionicon from 'react-native-vector-icons/Ionicons';

const tabBarIconSize = 30;
const tintColor = 'blue';
const AlertsTabNavigator = TabNavigator({
    Incoming: {
        screen:IncomingProductRequestsView,
        navigationOptions: {
            tabBarLabel: 'Incoming',
            tabBarIcon: ({ tintColor }) => <IncomingProductRequestsBadge color={tintColor} size={tabBarIconSize}/>
        }
    },
    Outgoing:{
        screen:OutgoingProductRequestsView,
        navigationOptions: {
            tabBarLabel: 'Outgoing',
            tabBarIcon: ({ tintColor }) => <OutgoingProductRequestsBadge color={tintColor} size={tabBarIconSize}/>
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
        showLabel:false,
        showIcon: true,
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
        iconStyle:{
            width:100,
        },
        indicatorStyle:{
            backgroundColor:theme.ICON_SELECTED_COLOR
        }
    }
});

export default AlertsTabNavigator;