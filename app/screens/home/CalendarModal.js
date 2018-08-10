import React, { Component } from 'react';
import { ScrollView, Text, View, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { List, ListItem, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { CommonStyles, deepcopy, RequiredFieldMessage} from '../../config/commons'
import { NavigationActions } from 'react-navigation';
import { theme } from '../../config/themes';
import moment from 'moment' // 2.20.1
import { connect } from 'react-redux';
import { createOrder } from '../../actions/ActionCreators';

const iconSize = 30;
const _format = 'YYYY-MM-DD'
// Can have minDate as todays date + 2 days
const _minDate = moment().add(1, 'days').format(_format)

class CalendarModal extends Component {

    constructor(props){
        super(props);
        Alert.alert("StateParams",JSON.stringify(this.props.navigation.state.params,null,2));
        this.state = {
            markedDates:this.props.navigation.state.params.markedDates,
            productInfo:this.props.navigation.state.params.productInfo,
            deliveryAddress:"asdf",
            contact:"adsf",
            email:"afds",
            customerName:"asfdasfd",
            deliveryAddressMissingError:false,
            contactMissingError:false,
            emailMissingError:false,
            customerNameMissingError:false,
            markedDatesMissing:false,
            processingOrder:false,
            submitButtonPressed:false,
        };
    }

    onDaySelect = (day) => {
        const _selectedDay = day.dateString;
        if(this.state.markedDates[_selectedDay] && this.state.markedDates[_selectedDay].disabled) return;

        let selected = true;
        if (this.state.markedDates[_selectedDay]) {
        // Already in marked dates, so reverse current marked state
        selected = !this.state.markedDates[_selectedDay].selected;
        }

        // Create a new object using object property spread since it should be immutable
        // Reading: https://davidwalsh.name/merge-objects
        const updatedMarkedDates = {...this.state.markedDates, ...{ [_selectedDay]: { selected: selected, dotColor:'red' } } }

        // Triggers component to render again, picking up the new state
        this.setState({ markedDates: updatedMarkedDates });
    }

    processForm(){
        this.state.deliveryAddressMissingError = this.state.deliveryAddress.length === 0;
        this.state.contactMissingError = this.state.deliveryAddress.length === 0;
        this.state.emailMissingError = this.state.deliveryAddress.length === 0;
        this.state.customerNameMissingError = this.state.deliveryAddress.length === 0;
        // count all non disabled dates which are selected
        var markedDatesMissing = true;
        var that = this;
        Object.values(this.state.markedDates).forEach(function(markedDate){
            if(markedDate.selected && !markedDate.disabled){
                markedDatesMissing = false;
                return;
            }
        });
        this.state.markedDatesMissing = markedDatesMissing;
    }

    isOrderValid(){
        return !(this.state.markedDatesMissing
            || this.state.deliveryAddressMissingError 
            || this.state.contactMissingError 
            || this.state.emailMissingError 
            || this.state.customerNameMissingError);
    }

    processOrder(){
        this.processForm();
        if(this.isOrderValid()){
            this.state.processingOrder = true;
            this.props.createOrder(this.state);
        }
        else
            Alert.alert("Information missing","Please fill in all the fields")
    }

    render() {
        return (
            <View style={styles.requestProductContainer}>
                <View style={styles.requestProductHeader}>
                    
                    <Text style={{color:theme.TEXT_TITLE_COLOR}}>Order details</Text>

                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.back())} >
                        <Ionicon 
                            name='md-close' 
                            size={iconSize} 
                            style={{
                                height:iconSize,
                                width:iconSize, 
                                textAlign:'center',
                                color:theme.TEXT_TITLE_COLOR
                            }}
                        />
                    </TouchableOpacity>

                    
                </View>

                <ScrollView style={{padding:5,marginBottom:50}}>
                    
                    <View style={styles.inputContainerStyle}>
                        <Text style={styles.inputTitle}>Select dates</Text>
                        <Calendar
                            style={[styles.calendar]}
                            markedDates={this.state.markedDates}
                            minDate={_minDate}
                            onDayPress={this.onDaySelect}
                        />
                        <FormValidationMessage>{this.state.markedDatesMissing? RequiredFieldMessage:''}</FormValidationMessage>
                    </View>

                    <View style={styles.inputContainerStyle}>
                        <Text style={styles.inputTitle}>Delivery Address</Text>
                        <FormInput 
                            multiline
                            numberOfLines={4}
                            inputStyle={[styles.formInputStyle,{width:'100%'}]} 
                            containerStyle={styles.formInputAboutContainerStyle}
                            onChangeText ={(deliveryAddress) => this.setState({deliveryAddress}) } />

                        <FormValidationMessage>{this.state.deliveryAddressMissingError? RequiredFieldMessage:''}</FormValidationMessage>
                    </View>      


                    <View style={styles.formView}>     

                        <FormInput 
                            onChangeText={(customerName) => this.setState({customerName})} 
                            inputStyle={styles.formInputStyle} containerStyle={styles.formInputContainerStyle} 
                            placeholder='Name'
                            autoCapitalize='none'
                            />
                        <FormValidationMessage>{this.state.customerNameMissingError? RequiredFieldMessage:''}</FormValidationMessage>

                        <FormInput 
                            onChangeText={(email) => this.setState({email})} 
                            inputStyle={styles.formInputStyle}  
                            containerStyle={styles.formInputContainerStyle} 
                            placeholder='Email'
                            autoFocus
                            autoCapitalize='none'
                            keyboardType='email-address'
                            />
                        <FormValidationMessage>{this.state.emailMissingError? RequiredFieldMessage:''}</FormValidationMessage>
                        
                        <FormInput 
                            onChangeText={(contact) => this.setState({contact})} 
                            inputStyle={styles.formInputStyle} containerStyle={styles.formInputContainerStyle} 
                            placeholder='Contact No.'
                            autoCapitalize='none'
                            secureTextEntry={true}
                            keyboardType='phone-pad'
                            />
                        <FormValidationMessage>{this.state.contactMissingError? RequiredFieldMessage:''}</FormValidationMessage>                 
                    </View>
                    <View style={{marginBottom:50}}>
                    {
                        !this.props.orderProcessing && 
                        !this.props.orderSuccessful &&
                        <Button
                        small
                        raised
                        buttonStyle={styles.availabilityButtonStyle}
                        title={this.state.submitButtonPressed? 'Processing':'Place order'}
                        onPress={()=> this.processOrder() }/>
                    }
                    { this.props.orderProcessing && <ActivityIndicator />}
                    
                    {
                        this.props.orderSuccessful &&  
                        <Button 
                        small
                        raised
                        buttonStyle={styles.availabilityButtonStyle}
                        title='Proceed to payment'
                        onPress={() => this.props.navigation.navigate('PaymentView',{'order':this.props.order})}
                        />
                    }
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    availabilityButtonStyle:{

    },
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
    return state.OrderReducer;
}
function mapDispatchToProps(dispatch){
    return{
        createOrder:(order) => dispatch(createOrder(order))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CalendarModal);
// export default CalendarModal;