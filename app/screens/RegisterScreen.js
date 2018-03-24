import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Alert, ScrollView, Text, StyleSheet, View,TouchableOpacity, TextInput } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { theme } from '../config/themes';
import { CommonStyles,RequiredFieldMessage } from '../config/commons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { User } from '../config/services';

class RegisterScreen extends Component {


    constructor(props){
        super(props);
        this.state = {
            username:'',
            fname:'',
            lname:'',
            password:'',
            missingUsername:false,
            missingPassword:false,
            missingFirstName:false
        }
    }
    onPressSignUp(){
        var missingUsername = this.state.username.length == 0;
        var missingPassword = this.state.password.length == 0;
        var missingFirstName = this.state.fname.length == 0;
        this.setState({
            'missingUsername':missingUsername,
            'missingPassword':missingPassword,
            'missingFirstName':missingFirstName
        })
        var error = missingUsername || missingPassword || missingFirstName;
        if(error)
            return;

        User.register(
        this.state,
        success = () => {
            Alert.alert('Registered. Please verify email');
            this.props.navigation.navigate('LoginScreen');    
        },
        error = () => {
            Alert.alert('Unable to sign up');
        })
        
    }


    render() {

        return (
            <View style={{backgroundColor:'white',height:'100%'}}>
                <View style={styles.signUpHeader}>
                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
                        <Ionicon name='md-arrow-back' size={30} style={{height:30,width:30,color:'white'}}/>
                    </TouchableOpacity>
                    <Text style={{color:'white',fontSize:20}}>Sign up</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps="handled" style={{paddingTop:10}}>
                   
                        <FormInput 
                            onChangeText={(username) => this.setState({username})} 
                            inputStyle={styles.formInputStyle} 
                            containerStyle={styles.formInputContainerStyle} 
                            placeholder='Email'
                            autoFocus
                            autoCapitalize='none'/>
                        <FormValidationMessage>{this.state.missingUsername? RequiredFieldMessage: ''}</FormValidationMessage>

                        <FormInput 
                            onChangeText={(fname) => this.setState({fname})} 
                            inputStyle={styles.formInputStyle} 
                            containerStyle={styles.formInputContainerStyle} 
                            placeholder='First Name'/>
                        <FormValidationMessage>{this.state.missingFirstName? RequiredFieldMessage: ''}</FormValidationMessage>

                        <FormInput onChangeText={(lname) => this.setState({lname})} inputStyle={styles.formInputStyle} containerStyle={styles.formInputContainerStyle} placeholder='Last Name'/>

                        <FormInput 
                            onChangeText={(password) => this.setState({password})} 
                            inputStyle={styles.formInputStyle} 
                            containerStyle={styles.formInputContainerStyle} 
                            placeholder='Password'
                            autoCapitalize='none'/>
                        <FormValidationMessage>{this.state.missingPassword? RequiredFieldMessage: ''}</FormValidationMessage>
                        <View style={{alignItems:'center'}}>
                        <Button 
                            title='Sign Up'
                            onPress={() => this.onPressSignUp()}
                            buttonStyle={[CommonStyles.buttonStyle,{width:'100%',marginTop:30}]}
                            textStyle={{textAlign:'center'}}
                            color='white'
                        />
                        </View>
                        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginBottom:20,marginTop:20}}>
                            <Text>
                            By tapping Sign up, you agree to our
                            </Text>

                            <TouchableOpacity>
                                <Text style={{color:theme.HEADER_BACKGROUND_COLOR}} onPress={() => console.log("Show terms")}>Terms and Conditions</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeView')} style={{alignItems:'center'}}>
                            <Text style={styles.buttonStyle}>Sign Up with Google</Text>
                        </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    signUpHeader:{
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
    buttonStyle:{
        backgroundColor:theme.BUTTON_BACKGROUND_COLOR,
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        color:theme.BUTTON_TEXT_COLOR,
        textAlign:'center',
        margin:5
    },
    formInputContainerStyle:{
        marginTop:20,
    }

});
export default RegisterScreen;