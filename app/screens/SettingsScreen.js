import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, StyleSheet, View,TouchableOpacity, TextInput,AsyncStorage,Alert } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { theme } from '../config/themes';
import { CommonStyles } from '../config/commons';
import { User } from '../config/services';
const sectionPadding = 10;

class SettingsScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            gatewayIP:'',
        };
    }
    testGateway(){
        Alert.alert("saved");
        
    }
    render() {

        return (
            <View>
            <View style={styles.settingsHeader}>
            
                <TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
                    <Ionicon name='md-arrow-back' size={30} style={{height:30,width:30,color:'white'}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.updateProduct()}>
                    <Text style={{color:'white',fontSize:20}}>Chat</Text>
                </TouchableOpacity>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{backgroundColor:'white',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                
                <View style={styles.formView}>           
                    <FormInput 
                        onChangeText={(username) => this.setState({username})} 
                        inputStyle={styles.formInputStyle}  
                        containerStyle={styles.formInputContainerStyle} 
                        placeholder='Gateway IP'
                        autoFocus
                        autoCapitalize='none'
                        
                        />
                    
                    <Button 
                        title='Save'
                        onPress={() => this.login()}
                        buttonStyle={[CommonStyles.buttonStyle,{marginTop:20}]}
                    />
                
                </View>

            </ScrollView>
            </View>
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

    },
    settingsHeader:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      padding:10,
      backgroundColor:theme.HEADER_BACKGROUND_COLOR,
    },


});
export default SettingsScreen;