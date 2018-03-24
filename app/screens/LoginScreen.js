import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, StyleSheet, View,TouchableOpacity, TextInput,AsyncStorage } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { CommonStyles, CommonBlue, RequiredFieldMessage, AsyncStorageKeys } from '../config/commons';
import { theme } from '../config/themes';
import { authenticate, busyIndicator } from '../actions/ActionCreators';
import { connect } from 'react-redux';

const sectionPadding = 10;

class LoginScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            usernameMissingError:false,
            usernameMissingError:false,
            
        };
    }
    login(){

        var usernameMissingError = this.state.username.trim().length == 0;
        this.setState({usernameMissingError});
        var passwordMissingError = this.state.password.trim().length == 0;
        this.setState({passwordMissingError});
        errorExists = usernameMissingError || passwordMissingError;
        if(errorExists) return;
        
        
        this.props.authenticate(
            this.state,
            success = (responseJson) =>{

                console.log(responseJson);
                AsyncStorage.setItem(AsyncStorageKeys.USER_ID,responseJson.user_id);
                AsyncStorage.setItem(AsyncStorageKeys.JWT,responseJson.jwt_token);
                
                //if the user already exists navigate to home screen via loading screen
                // Note; loading screen loads essential variables required for the child views
                //else navigate to profileCreation page
                AsyncStorage.getItem(AsyncStorageKeys.USER_PROFILE)
                .then((user_profile_id) => { 
                    console.log(user_profile_id);
                    var userExists = user_profile_id == responseJson.user_id;
                    if(userExists){
                        this.props.navigation.navigate('LoadingScreen');
                    }else{
                        this.props.navigation.navigate('ProfileCreation',{'email':this.state.username, 'user_id':responseJson.user_id});    
                    }
                }) 
               
            },
            failure = (err)=>{
                console.log(err);
                //for now
                this.props.navigation.navigate('HomeView');
            }
        );

    }
    render() {

        return (
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{backgroundColor:'white',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                
                <View style={styles.formView}>           
                    <FormInput 
                        onChangeText={(username) => this.setState({username})} 
                        inputStyle={styles.formInputStyle}  
                        containerStyle={styles.formInputContainerStyle} 
                        placeholder='Email'
                        autoFocus
                        autoCapitalize='none'
                        keyboardType='email-address'
                        />
                    <FormValidationMessage>{this.state.usernameMissingError? RequiredFieldMessage:''}</FormValidationMessage>
                    <FormInput 
                        onChangeText={(password) => this.setState({password})} 
                        inputStyle={styles.formInputStyle} containerStyle={styles.formInputContainerStyle} 
                        placeholder='Password'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        />
                    <FormValidationMessage>{this.state.passwordMissingError? RequiredFieldMessage:''}</FormValidationMessage>
                    <Button 
                        title='Login'
                        onPress={() => this.login()}
                        buttonStyle={[CommonStyles.buttonStyle,{marginTop:20}]}
                    />
                
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingLeft:20,paddingRight:20}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>
                        <Text style={{color:theme.HEADER_BACKGROUND_COLOR}}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('RegisterScreen')}>
                        <Text style={{color:theme.HEADER_BACKGROUND_COLOR}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                <Button 
                    title='Login with google'
                    onPress={() => this.props.navigation.navigate('HomeView')}
                    buttonStyle={CommonStyles.buttonStyle}
                />
                </View>

            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    formView:{
        marginTop:20,
        marginBottom:20
    },
    formInputStyle:{
        color:theme.HEADER_BACKGROUND_COLOR
    },
    formInputContainerStyle:{
        marginTop:30
    },
    buttonWrapper:{

    }

});

function mapStateToProps(state) {
    return state.ConstantsReducer;
}

function mapDispatchToProps(dispatch) {
    return {
        authenticate: (user,success,failure)=> dispatch(authenticate(user,success,failure))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
