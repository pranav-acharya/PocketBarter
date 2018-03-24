import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { List, ListItem, FormInput, FormValidationMessage } from 'react-native-elements';
import { theme } from '../config/themes';
import { CommonStyles, RequiredFieldMessage } from '../config/commons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Images from '../assets';
import { createUser } from '../actions/ActionCreators';
import { connect } from 'react-redux';


var ImagePicker = require('react-native-image-picker');
var options = {
  title: 'Select Profile Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
  quality:0.4,
  noData:true,
  mediaType:'photo'
};
class ProfileCreation extends Component {
  constructor(props){
    super(props);
    console.log(this.props.navigation);
    this.state = {
      fname:'',
      fnameMissing:false,
      lname:'',
      lnameMissing:false,
      address:'',
      profileImage:Images.add_image_camera,
      profileImageMissing:false,
      mobile:9898989898,
      email:(this.props.navigation.state.params!=undefined)? this.props.navigation.state.params.email :'',
      user_id:(this.props.navigation.state.params!=undefined)? this.props.navigation.state.params.user_id :'',

    }

  }
  onSubmitDetails(){
    //validate the details
    this.props.createUser(this.state,
    successFn = (responseJson) => {
      console.log(responseJson);
      AsyncStorage.setItem("user_profile",responseJson.user_id);
      this.props.navigation.navigate('UserVerificationScreen'); 
    },
    failureFn = (err)=> {
      console.log(err);
    })
  }
  showPicker(){
    

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri, filename:response.fileName };
        this.setState({'profileImage':source});    
      }
    });
  }
  render() {
    return (

      <View style={{flexDirection:'column',backgroundColor:'white',height:'100%'}}>
        <View style={styles.profileCreationHeader}>
            <Text style={styles.headerTitle}>Create your profile</Text>
            <TouchableOpacity onPress={() => this.onSubmitDetails()}>
              <Text style={{color:'white'}}>Next</Text>
            </TouchableOpacity>
        </View>

        <View >
          <Text style={[styles.inputTitle,{padding:10}]}>Profile Picture</Text>
          <View style={{padding:0,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity onPress={() => this.showPicker()} style={{alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'gray',padding:10,width:'90%'}}>
              <Image source={ this.state.profileImage } style={{height:200,width:'100%',backgroundColor:'white'}} resizeMode='center'/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formView}>

          
          <FormInput 
              editable={false}
              value={this.state.email}
              inputStyle={styles.formInputStyle} 
              containerStyle={[styles.formInputContainerStyle,styles.errorMessagePadding]} 
              placeholder='Email'/>

          <FormInput 
              onChangeText={(fname) => this.setState({fname})} 
              inputStyle={styles.formInputStyle} 
              containerStyle={styles.formInputContainerStyle} 
              placeholder='First Name'/>
          <FormValidationMessage>{this.state.fnameMissing? RequiredFieldMessage: ''}</FormValidationMessage>

          <FormInput 
              onChangeText={(lname) => this.setState({lname})} 
              inputStyle={styles.formInputStyle} 
              containerStyle={styles.formInputContainerStyle} 
              placeholder='Last Name'/>
          <FormValidationMessage>{this.state.lnameMissing? RequiredFieldMessage: ''}</FormValidationMessage>

          <FormInput 
              onChangeText={(mobile) => this.setState({mobile})} 
              inputStyle={styles.formInputStyle} 
              containerStyle={[styles.formInputContainerStyle,styles.errorMessagePadding]} 
              keyboardType='phone-pad'
              placeholder='Mobile'/>

          <FormInput 
              onChangeText={(address) => this.setState({address})} 
              inputStyle={styles.formInputStyle} 
              containerStyle={[styles.formInputContainerStyle,styles.errorMessagePadding]} 
              placeholder='Address'/>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    headerTitle:{
        fontSize:24,
        color:theme.HEADER_TEXT_COLOR,
    },
    profileCreationHeader:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:theme.HEADER_BACKGROUND_COLOR,
    },
    formView:{
        marginTop:20,
        marginBottom:20
    },
    formInputStyle:{
        color:theme.HEADER_BACKGROUND_COLOR,
    },
    errorMessagePadding:{
      marginBottom:20
    }
});

function mapStateToProps(state) {
  return state.ConstantsReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    createUser: (user,successFn,failureFn) => dispatch(createUser(user,successFn,failureFn))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCreation);