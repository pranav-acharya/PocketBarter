import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { theme } from '../config/themes';
import { CommonStyles, AuthTypes, AsyncStorageKeys, WEB_CLIENT_ID } from "../config/commons";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";


class LandingPage extends Component {
    componentDidMount() {
        this._setupGoogleSignin();
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            await GoogleSignin.configure({
                webClientId:WEB_CLIENT_ID,
                offlineAccess: false
            });

            var user = await GoogleSignin.currentUserAsync();
            console.log(user);
            
        } catch (err) {
            console.log("Play services error", err.code, err.message);
            // this.props.navigation.navigate("LandingPage");
        }
    }

    googleSignIn() {

        GoogleSignin.signIn()
            .then(user => {
                // persist the auth type as google in store
                AsyncStorage.setItem(AsyncStorageKeys.AUTH, AuthTypes.GOOGLE);
                console.log(user);
                //this.setState({ user: user });
            })
            .catch(err => {
                console.log("WRONG SIGNIN", err);
            })
            .done();
    }

    googleSignOut() {
        GoogleSignin.revokeAccess()
            .then(() => GoogleSignin.signOut())
            .then(() => {
                this.setState({ user: null });
            })
            .done();
    }

    render() {
        return (
            <View
                style={{
                    padding: 5,
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "white",
                    height:"100%"
                }}
            >
                <View style={styles.loginControl}>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("LoginScreen")
                        }
                    >
                        <Text style={{ color: theme.HEADER_BACKGROUND_COLOR, fontSize: 18 }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.googleSignInContainer}>
                    <GoogleSigninButton
                        style={{ width: 120, height: 44 }}
                        color={ GoogleSigninButton.Color.Light }
                        size={ GoogleSigninButton.Size.Icon }
                        onPress={() => {
                            this.googleSignIn();
                        }}
                    />
                </View>
                <View style={styles.fixedApplyFilterButtonContainer}>
                    <Button
                        title="Sign up"
                        onPress={() =>
                            this.props.navigation.navigate("RegisterScreen")
                        }
                        buttonStyle={CommonStyles.buttonStyle}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    fixedApplyFilterButtonContainer: {
        /*position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,*/
        padding: 10,
        flex: 1
    },
    loginControl: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: theme.SEPARATOR_COLOR,
        borderBottomWidth: 1,
        alignItems: "center",
        padding: 5,
    },
    googleSignInContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.GLOBAL_BACKGROUND_COLOR,
    },
});
export default LandingPage;
