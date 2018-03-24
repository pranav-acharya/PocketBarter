import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, View, AppState, Alert } from "react-native";
import { connect } from "react-redux";
import { receivedMessage, loadChatHistory, initializeConstants } from "../actions/ActionCreators";
import { connectChat, onReceiveMessage } from "../config/ChatService";
import { registerAppListener, registerKilledListener } from "../config/Notifications";
import FCM from "react-native-fcm";
import { GoogleSignin } from "react-native-google-signin";
import { AsyncStorageKeys, ChatAttributes, AuthTypes, WEB_CLIENT_ID } from "../config/commons"

// necessary to call this before the app even loads
registerKilledListener();

class LoadingScreen extends Component {

	async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            await GoogleSignin.configure({
                webClientId:WEB_CLIENT_ID,
                offlineAccess: false
            });

            var user = await GoogleSignin.currentUserAsync();
            //Alert.alert("Welcome " + user.email);
            console.log(user);
            
        } catch (err) {
            console.log("Play services error", err.code, err.message);
            Alert.alert("Play services error");
            // this.props.navigation.navigate("LandingPage");
        }
    }

    googleSignIn(){
    	Alert.alert("Logging in on your behalf");
    	GoogleSignin.signIn()
        .then(user => {
            console.log(user);
        })
        .catch(err => {
            console.log("WRONG SIGNIN", err);
        })
        .done();

    }

	componentDidMount() {
		var that = this;

		// Listens to Notifications
		registerAppListener();

		AsyncStorage.multiGet(
			[AsyncStorageKeys.JWT, AsyncStorageKeys.USER_ID, AsyncStorageKeys.SAVED_PRODUCTS, AsyncStorageKeys.AUTH],
			(err, stores) => {
				var navigateToHome = true;
				var token, user_id;
				var saved_products = [];
				var authType;
				stores.map((result, i, store) => {
					let key = store[i][0];
					let val = store[i][1];
					console.log(key, val);

					if (key === AsyncStorageKeys.JWT) {
						token = val;
						if (val === null) {
							navigateToHome = false;
						}
					} else if (key === AsyncStorageKeys.USER_ID) user_id = val;
					else if (key === AsyncStorageKeys.SAVED_PRODUCTS) {
						if (val !== null) {
							saved_products = JSON.parse(val);
						}
					}
					else if(key === AsyncStorageKeys.AUTH){
						authType = val;
					}
				});

				if(authType === AuthTypes.GOOGLE){
					// Assume that its always valid
					this._setupGoogleSignin();
					navigateToHome = true;
				}
				if (navigateToHome) {
					// Create a web-socket to get info
					// the web socket will update the state tree / redux store from this place itself
					// TODO: check if this can be moved to an action creator completely?

					// Load the chat from async storage
					connectChat(user_id);
					that.props.loadChatHistory();
					onReceiveMessage(e => {
						// a message was received

						var chatData = JSON.parse(e.data);
						console.log(chatData);
						chatData[ChatAttributes.VISITED] = 0;
						var key = AsyncStorageKeys.CHAT;

						AsyncStorage.getItem(key).then(value => {
							var chatObj = {};
							if (value != null) {
								chatObj = JSON.parse(value);
							}
							var target_user_id =
								chatData[ChatAttributes.SENDER_ID] === user_id
									? chatData[ChatAttributes.RECEIVER_ID]
									: chatData[ChatAttributes.SENDER_ID];
							if (chatObj[target_user_id] == undefined) {
								chatObj[target_user_id] = [];
							}
							chatObj[target_user_id].push(chatData);
							// probably remove few keys to optimize storage

							console.log(chatData);
							AsyncStorage.setItem(key, JSON.stringify(chatObj));
							// If the sender is the same user, the target user is the receiver
							// target_user is the one whom the current user is chatting with

							that.props.receivedMessage(
								chatData,
								target_user_id
							);

							// If the app is in background state, send notification
							if (AppState.currentState !== "active") {
								FCM.presentLocalNotification({
									vibrate: 500,
									title: target_user_id,
									body: chatData["m"],
									priority: "high",
									show_in_foreground: true,
									group: "test",
									number: 10
								});

								
							}
						});
					});

					FCM.getFCMToken().then(token => {
				      	console.log("TOKEN (getFCMToken)", token);
				    });
					
					navigator.geolocation.getCurrentPosition(
						position => {
							this.props.initializeConstants({
								position: position,
								user_id: user_id,
								saved_products: saved_products,
								login_success: true
							});
							//this.props.navigation.navigate('HomeView',{'position':position,'user_id':user_id,'saved_products':saved_products});
							this.props.navigation.navigate("HomeView");
						},
						error => {
							console.log(error);
							this.props.initializeConstants({
								user_id: user_id,
								saved_products: saved_products,
								login_success: true
							});
							//this.props.navigation.navigate('HomeView',{'user_id':user_id,'saved_products':saved_products});
							// TODO: recursively call this function to get the position?
							// Leafving it blank as of now. Then allow the user to set it manually
							this.props.navigation.navigate("HomeView");
						},
						{
							enableHighAccuracy: true,
							timeout: 20000,
							maximumAge: 1000
						}
					);
				} else {
					this.props.navigation.navigate("LandingPage");
					//this.props.navigation.navigate('ProfileCreation');
				}
			}
		);
	}

	render() {
		return (
			<View>
				<ActivityIndicator />
			</View>
		);
	}
}

function mapStateToProps(state) {
	return state.ConstantsReducer;
}

function mapDispatchToProps(dispatch) {
	return {
		loadChatHistory: () => dispatch(loadChatHistory()),
		receivedMessage: (message, target_user_id) =>
			dispatch(receivedMessage(message, target_user_id)),
		initializeConstants: constants =>
			dispatch(initializeConstants(constants))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);