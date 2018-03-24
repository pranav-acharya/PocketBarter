import React, { Component } from 'react';
import { Text, StyleSheet, View,TouchableOpacity,TextInput, Alert } from 'react-native';
import { Button, FormInput,FormValidationMessage } from 'react-native-elements';
import { theme } from '../config/themes';
import { CommonStyles,RequiredFieldMessage } from '../config/commons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
import { User } from '../config/services';

class ForgotPasswordScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            emailMissingError:false
        }
    }

    forgotPasswordRequest(){
        var emailMissingError = this.state.email.trim().length == 0;
        this.setState({emailMissingError});
        if(emailMissingError) return;
        User.forgotPassword(
            this.state.email,
            success = (responseJson) => {
                Alert.alert('Password information has been sent to your email');
                this.props.navigation.navigate('LoginScreen');

            },
            failure = (err)=> {
                Alert.alert('An error occured while resetting the password');
            }
        )

        
    }

    render() {

        return (
            <View>
                <View style={styles.forgotPasswordHeader}>
                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
                        <Ionicon name='md-arrow-back' size={30} style={{height:30,width:30,color:'white'}}/>
                    </TouchableOpacity>
                    <Text style={{color:'white',fontSize:20}}>Forgot Password</Text>
                </View>

                <View style={{padding:10,flexDirection:'column',backgroundColor:'white',justifyContent:'center',height:'100%'}}>
                    <View style={styles.emailInformationWrapper}>
                        <Text style={{textAlign:'center',width:'100%'}}>Please enter your registered email id</Text>
                        <FormInput 
                            placeholder='Email' 
                            autoFocus 
                            autoCapitalize='none' 
                            onChangeText={(email) => this.setState({email})} 
                            inputStyle={styles.formInputStyle} />
                        <FormValidationMessage>{this.state.emailMissingError? RequiredFieldMessage: ''}</FormValidationMessage>
                    </View>
                    
                    <View style={styles.fixedApplyFilterButtonContainer}>
                        <Button
                            title="Continue"
                            onPress={()=> this.forgotPasswordRequest()}
                            buttonStyle={[CommonStyles.buttonStyle,{padding:10,paddingLeft:30,paddingRight:30}]}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    fixedApplyFilterButtonContainer:{
        flex:1,
        width:'100%',
        alignItems:'center'
    },
    emailInformationWrapper:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        

    },
    forgotPasswordHeader:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        padding:10,
        backgroundColor:theme.HEADER_BACKGROUND_COLOR,
    },
    formInputStyle:{
        color:theme.HEADER_BACKGROUND_COLOR,
        borderColor:theme.HEADER_BACKGROUND_COLOR
    },
});
export default ForgotPasswordScreen;