import React from 'react';
import { StackNavigator, DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { StyleSheet, Platform, Text, ScrollView, TouchableOpacity, View } from 'react-native';
import LandingPage from '../screens/LandingPage'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import UserVerificationScreen from '../screens/UserVerificationScreen'
import LoadingScreen from '../screens/LoadingScreen'
import ProfileCreation from '../screens/ProfileCreation'
import SettingsScreen from '../screens/SettingsScreen'
import HomeViewStackNavigator from '../screens/home/HomeRouter';
import AlertsView from './home/alerts/AlertsView'
import { theme } from '../config/themes'
// TODO: Define a proper menu here
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
        <View>
            <TouchableOpacity>
                <Text style={styles.menuItem}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.menuItem}>Profile</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  </ScrollView>
);

const AppRouterStack = StackNavigator({
    LoadingScreen:{
        screen: LoadingScreen
    },
    LandingPage:{
        screen: LandingPage
    },
    LoginScreen:{
        screen: LoginScreen
    },
    ProfileCreation:{
        screen: ProfileCreation
    },
    RegisterScreen:{
        screen: RegisterScreen
    },
    ForgotPasswordScreen:{
        screen: ForgotPasswordScreen
    },
    UserVerificationScreen:{
        screen: UserVerificationScreen
    },
    HomeView: {
        screen: HomeViewStackNavigator,
    },
    Settings:{
        screen: SettingsScreen
    },
}, {
    headerMode: 'none',
});

const AppRouter = DrawerNavigator({
    Menu: {
        screen: AppRouterStack
    }
},{
    drawerWidth:200,
    drawerPosition:'left',
    contentComponent: CustomDrawerContentComponent
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuItem:{
        borderBottomWidth:1,
        borderColor:theme.SEPARATOR_COLOR,
        color:theme.TEXT_SUBTITLE_COLOR,
        padding:5,
        fontSize:16,
    }
});


export default AppRouter;