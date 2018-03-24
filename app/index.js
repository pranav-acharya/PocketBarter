import React, { Component } from "react";
import AppRouter from "./screens/AppRouter";
import { Platform, View, AsyncStorage, Modal, Text, StyleSheet, ActivityIndicator } from "react-native";
import { IOS_PADDING_TOP } from "./config/commons";
import { connect } from 'react-redux';

class App extends Component {
	constructor(props) {
		super(props);
		//clearing the tokens to force reset
		//comment in production
		//AsyncStorage.removeItem('jwt_token', (err) => console.log('removed jwt_token', err));
		//AsyncStorage.removeItem('user_id', (err) => console.log('removed user_id', err));
		//AsyncStorage.removeItem('user_profile', (err) => console.log('removed user_profile', err));
		//AsyncStorage.removeItem('saved_products', (err) => console.log('removed saved_products', err));
		//AsyncStorage.removeItem('chat', (err) => console.log('removed chat', err));
		


	}
	render() {
		return (
			<View
				style={{
					paddingTop: Platform.OS === "ios" ? IOS_PADDING_TOP : 0,
					height: "100%",
					width: "100%"
				}}
			>
				<Modal 
					visible={this.props.busy_indicator}
					transparent={true}
					onRequestClose={() => {console.log('close modal')}}
				>
					<View style={styles.modalBackground}>
				        <View style={styles.activityIndicatorWrapper}>
				          	<ActivityIndicator />
				          	<Text>Loading</Text>
				        </View>
			      	</View>
				</Modal>

				<AppRouter />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  	modalBackground: {
	    flex: 1,
	    alignItems: 'center',
	    flexDirection: 'column',
	    justifyContent: 'space-around',
	    backgroundColor: '#00000040'
  	},
  	activityIndicatorWrapper: {
	    backgroundColor: '#FFFFFF',
	    height: 100,
	    width: 100,
	    borderRadius: 10,
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'space-around'
  	}
});

function mapStateToProps(state) {
	return state.ConstantsReducer;
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
