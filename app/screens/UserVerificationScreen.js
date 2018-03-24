import React, { Component } from 'react';
import { Text, StyleSheet, View,TouchableOpacity,TextInput } from 'react-native';
import { Button,Card } from 'react-native-elements';
import { theme } from '../config/themes';
import Ionicon from 'react-native-vector-icons/Ionicons';


class UserVerificationScreen extends Component {

    render() {

        return (

            <View style={{flexDirection:'column',backgroundColor:'white',height:'100%'}}>
                <View style={styles.userVerificationHeader}>
                    <Text style={styles.headerTitle}>New User Info</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LoadingScreen')}>
                        <Text style={{color:'white'}}>Skip for now</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Card title='Identity verification'>
                      <Text style={{marginBottom: 10}}>
                        Please upload a valid form of identification so that we can verify your identity. Valid forms of identifications include: passport, driver's license or state ID
                      </Text>
                      <Button
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Upload' />
                    </Card>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    headerTitle:{
        fontSize:24,
        color:theme.HEADER_TEXT_COLOR
    },
    fixedApplyFilterButtonContainer:{
        flex:1,
        width:'100%'
    },
    emailInformationWrapper:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',

    },
    userVerificationHeader:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:theme.HEADER_BACKGROUND_COLOR,
    }
});
export default UserVerificationScreen;