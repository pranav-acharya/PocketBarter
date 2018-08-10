import React, { Component } from 'react';
import { ScrollView, Text, View, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { List, ListItem, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { CommonStyles } from '../../config/commons'
import { NavigationActions } from 'react-navigation';
import { theme } from '../../config/themes';
import { connect } from 'react-redux';
import { makePayment, resetPaymentState } from '../../actions/ActionCreators';
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input-fullpage';

class PaymentView extends Component {

    constructor(props){
        super(props);
        Alert.alert("StateParams",JSON.stringify(this.props.navigation.state.params,null,2));
        this.state = {
            order:this.props.navigation.state.params.order,
            card:{},
            valid:false,
        };
    }

    _onChange = (form) => {
        this.state.valid = form.valid;
        //Alert.alert("Form",JSON.stringify(form,null,2));
        this.state.card = form.values;
    };

    submitPayment(){
        //Alert.alert("Form",JSON.stringify(this.state.card,null,2));
        if(this.state.valid)
            this.props.makePayment(this.state);
        else
            Alert.alert("Information missing", "Please fill all the details");
    }

    resetPayment(){
        this.card = {};
        this.valid = false;
        this.props.resetState();
        Alert.alert(
            'Payment successful',
            'Payment done',
            [
                { text:'OK', onPress:() => this.props.navigation.navigate('HomeViewTabNavigator') }
            ]
        );
    }

    render() {
        return (
            <View style={styles.requestProductContainer}>
                <View style={styles.requestProductHeader}>
                    <Text>Payment Details</Text>
                </View>

                <ScrollView style={{padding:5}}>
                    
                    
                    <CreditCardInput onChange={this._onChange} />

                    {this.props.paymentProcessing && <ActivityIndicator /> }
                    {
                        !this.props.paymentProcessing &&
                        !this.props.paymentSuccessful &&
                        <Button
                        small
                        raised
                        buttonStyle={styles.availabilityButtonStyle}
                        title='Pay' 
                        onPress={()=> this.submitPayment() }/>
                    }
                    {
                        !this.props.paymentProcessing &&
                        this.props.paymentSuccessful &&
                        this.resetPayment()

                    }
                    
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainerStyle:{
        borderColor:theme.SEPARATOR_COLOR,
        borderBottomWidth:1,
        marginTop:10,
        padding:10,  
    },
    inputTitle:{
        fontSize:22,
        paddingBottom:20,
        color:theme.HEADER_BACKGROUND_COLOR
    },
    requestProductHeader:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        borderColor:theme.SEPARATOR_COLOR,
        borderBottomWidth:1,
    },
    requestProductContainer:{
        backgroundColor:theme.GLOBAL_BACKGROUND_COLOR
    },
    formInputStyle:{
        color:'black',
    },
    priceFormInputStyle:{
        textAlign:'center',
        width:50
    },
    priceInputContainerStyle:{
        paddingBottom:1,
        backgroundColor:theme.GLOBAL_BACKGROUND_COLOR,
        borderBottomWidth:0
    },
    formInputContainerStyle:{

        marginBottom:20,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:0,
        marginRight:0,
        borderBottomWidth:2,
        borderBottomColor:theme.HEADER_BACKGROUND_COLOR,
    },
    formInputAboutContainerStyle:{
        marginLeft:0,
        marginRight:0,
        padding:5,
        backgroundColor:theme.GLOBAL_BACKGROUND_COLOR,
        borderColor: 'steelblue',
        borderWidth: 1,
        height:90
    },
    pricingView:{

    },
    pricingElement:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#f1f1f1',
        marginBottom:5,
        paddingLeft:5,
        paddingRight:5,
        borderWidth:1,
        borderColor:'#f1f1f1',
    },

});

function mapStateToProps(state){
    return state.PaymentReducer
}
function mapDispatchToProps(dispatch){
    return{
        makePayment:(payment) => dispatch(makePayment(payment)),
        resetState:() => dispatch(resetPaymentState())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PaymentView);
// export default CalendarModal;