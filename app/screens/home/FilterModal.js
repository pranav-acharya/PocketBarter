import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, StyleSheet, View,TouchableOpacity, Slider } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { CommonStyles } from '../../config/commons';
import { theme } from '../../config/themes';
import DatePicker from 'react-native-datepicker';
import CustomPicker from '../../components/CustomPicker';
import CategorySelector from '../../components/CategorySelector';
import {searchProducts} from '../../actions/ActionCreators';
import { connect } from 'react-redux';
const currency = '$';
const distanceUnit = 'miles';
const defaultDistance = 5;
const priceRangeDefault = {
    min:10,
    max:250
};
const defaultAvailabilityPeriodInDays = 7;
const javascriptDateStartYear = 1900;
const iconSize = 30;

class FilterModal extends Component {


    priceRangeSliderValuesChange = (values) => {
        this.setState({priceRangeSliderValues:values});
    }
    distanceSliderValuesChange = (values) => {
        this.setState({distanceSliderValue:values});
    }

    constructor(props) {
        super(props);
        this.state = this.props;
    }
    applyFilter(){

        this.props.updateFilter({
            ...this.props,
            ...this.state,
        });
    }
    componentDidMount(){
        //console.log(this.state);
    }
    render() {
        console.log(this.props);
        return (
            <View style={styles.filterWrapper}>
            <ScrollView style={{padding:5}}>
                <View style={styles.filterHeader}>
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

                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.back())} >
                        <Text style={{color:theme.TEXT_TITLE_COLOR}}>Reset all</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.availabilityContainer}>
                    <Text style={styles.filterTitle}>Availability</Text>
                    <View style={styles.dateRangeContainer}>
                        <DatePicker
                            style={{}}
                            date={this.state.availability.startDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            maxDate={this.state.availability.endDate}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            onDateChange={
                                (date) => {
                                    this.setState({
                                        'availability':{
                                            'startDate': date,
                                            'endDate':this.state.availability.endDate
                                        }
                                    });
                                }
                            }
                          />
                        <Text> to </Text>
                        <DatePicker
                            style={{}}
                            date={this.state.availability.endDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.state.availability.startDate}                            
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            onDateChange={
                                (date) => {
                                    this.setState({
                                        'availability':{
                                            'startDate':this.state.availability.startDate,  
                                            'endDate': date
                                        }
                                    });
                                }
                            }
                          />

                    </View>
                </View>    

                <View style={styles.sortingContainer}>
                    <Text style={styles.filterTitle}>Sort by</Text>
                    <View style={styles.sortByOptionsContainer}>
                        <CustomPicker 
                        initialValue={this.props.sort}
                        onValueChange={(value) => this.setState({'sort':value})}
                        values={["Price:low to high","Price:high to low","Distance","Rating"]}/>

                    </View>
                </View>    

                <View style={styles.categoryComponentContainer}>
                    <Text style={styles.filterTitle}>Category</Text>
                    <CategorySelector 
                    initialCategoryId={this.props.category.categoryId}
                    onCategoryChanged={(category)=> this.setState({category})} />
                </View>    
                <View style={styles.rangeContainer}>
                    <Text style={styles.filterTitle}>Price Range</Text>
                    <View style={styles.rangeValueTextContainer}>
                        <Text style={styles.textStyle}>{currency + this.state.priceRangeSliderValues[0]}</Text>
                        <Text style={styles.textStyle}> - </Text>
                        <Text style={styles.textStyle}>{currency + this.state.priceRangeSliderValues[1]}</Text>
                    </View>
                    <MultiSlider
                        values={[this.state.priceRangeSliderValues[0],this.state.priceRangeSliderValues[1]]}
                        onValuesChange={this.priceRangeSliderValuesChange}
                        min={0}
                        max={1000}
                        step={1}
                        allowOverlap
                        snapped
                        selectedStyle={{backgroundColor:theme.HEADER_BACKGROUND_COLOR}}
                        markerStyle={{backgroundColor:theme.HEADER_BACKGROUND_COLOR}}
                        containerStyle={styles.multiSliderContainerStyle}
                    />
                </View>
                
                <View style={styles.rangeContainer}>
                    <Text style={styles.filterTitle}>Distance</Text>
                    <View style={styles.rangeValueTextContainer}>
                        <Text style={styles.textStyle}>{'Within ' + this.state.distanceSliderValue + ' ' +distanceUnit}</Text>
                    </View>
                    
                    <MultiSlider
                        values={this.state.distanceSliderValue}
                        onValuesChange={this.distanceSliderValuesChange}
                        min={0}
                        max={100}
                        step={1}
                        selectedStyle={{backgroundColor:theme.HEADER_BACKGROUND_COLOR}}
                        markerStyle={{backgroundColor:theme.HEADER_BACKGROUND_COLOR}}
                        containerStyle={styles.multiSliderContainerStyle}
                      />
                </View>
                    
                <View style={{height:100}}>
                </View>
                
                
            </ScrollView>
            <View style={styles.fixedApplyFilterButtonContainer}>
                <Button
                    title="Apply Filter"
                    buttonStyle={CommonStyles.buttonStyle}
                    onPress={()=>{
                        this.applyFilter();
                        this.props.navigation.dispatch(NavigationActions.back());                    
                    }}
                    style={{
                        fontSize:22
                    }}
                />
            </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    filterWrapper:{
        backgroundColor:theme.GLOBAL_BACKGROUND_COLOR
    },
    textStyle:{
        color:theme.TEXT_TITLE_COLOR
    },
    filterTitle:{
        padding:5,
        fontSize:22,
        paddingBottom:20,
        color:theme.HEADER_BACKGROUND_COLOR
    },
    filterHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:theme.SEPARATOR_COLOR,
        borderBottomWidth:1,
        alignItems:'center',
        padding:5
    },
    categoryContainer:{
        flexDirection:'row',
        padding:10
    },
    categoryIcon:{
        height:40,
        width:40,
        textAlign:'center'
    },
    rangeContainer:{
        flexDirection:'column',
        borderTopWidth:1,
        borderColor:theme.SEPARATOR_COLOR,
        padding:5,
        margin:5,
    },
    rangeValueTextContainer:{
        flexDirection:'row',
        paddingTop:5,
        paddingBottom:10,
    },
    multiSliderContainerStyle:{
        height:30,
        paddingTop:10,
        paddingBottom:10,
        marginBottom:10
    },
    distanceSliderContainerStyle:{

    },
    fixedApplyFilterButtonContainer:{
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        padding:5,
        borderColor:theme.SEPARATOR_COLOR,
        borderTopWidth:1,
        zIndex:10,
        backgroundColor:'white',
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 5},
        shadowOpacity: 0.9,
        shadowRadius: 1,
        elevation: 10
    },
    dateRangeContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
    availabilityContainer:{
        borderColor:theme.SEPARATOR_COLOR,
        borderBottomWidth:1,
        paddingTop:10,
        paddingBottom:10,
    },
    sortingContainer:{
        borderColor:theme.SEPARATOR_COLOR,
        borderBottomWidth:1,
        paddingTop:10,
        paddingBottom:10,
    }

});
function mapStateToProps(state){
    return state.FilterReducer
}
function mapDispatchToProps(dispatch){
    return{
        updateFilter:(filter) => dispatch(searchProducts(filter)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FilterModal);
