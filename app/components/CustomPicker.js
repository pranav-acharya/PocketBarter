import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { theme } from '../config/themes';


const windowWidth = Dimensions.get('window').width;
const ITEMS_PER_ROW = 2;
const ITEM_HEIGHT = 50;


export default class CustomPicker extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedIndex:this.props.initialValue || 0
        }
    }

    getStyleForPicker(itemIndex){
        return (itemIndex==this.state.selectedIndex)?styles.ItemSelectedStyle:styles.ItemDeslectedStyle
    }

    onPressItem(itemIndex){
        return  (() => {
            this.setState({selectedIndex : itemIndex});
            if(this.props.onValueChange)
                this.props.onValueChange(itemIndex); 
        })
    }

    render(){
        var pickerItemDOM = [];
        var i =0;
        while(i<this.props.values.length){
        
            
            var pickerItemRow = [];
            for(var index=0;index<ITEMS_PER_ROW;index++){
                if(i < this.props.values.length){
                    var value = this.props.values[i];
                    pickerItemRow.push(
                        <View key={i} style={{flex:1}}>
                            <TouchableOpacity onPress={this.onPressItem(i)} >
                                <Text style={[styles.itemStyle,this.getStyleForPicker(i)]}>{value}</Text>
                            </TouchableOpacity>
                        </View>
                    )    
                    i++;
                }else{
                    break;
                }
                
            }
            pickerItemDOM.push(
                <View style={{flex:1,flexDirection:'row', alignItems:'center', justifyContent:'center'}}  key={Math.floor(i/ITEMS_PER_ROW)}>
                    { pickerItemRow }
                </View>
            )
        }
        return(
            
            <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            {
                pickerItemDOM
            }
            </View>
        )
    }
}

CustomPicker.propTypes = {
    values:PropTypes.array.isRequired,
}

var styles = StyleSheet.create({
    pickerItem:{
        borderColor:theme.PICKER_DEFAULT_BORDER_COLOR,
        borderWidth:1,
        padding:10,
        width:'50%'
    },
    itemStyle:{
        borderColor:theme.PICKER_BORDER_COLOR,
        borderWidth:1,
        padding:10,
        textAlign:'center',
        margin:5,
    },
    ItemSelectedStyle : {
        backgroundColor:theme.PICKER_BACKGROUND_SELECTED_COLOR,
        color:theme.PICKER_TEXT_SELECTED_COLOR
    },
    ItemDeslectedStyle : {
        backgroundColor:theme.PICKER_BACKGROUND_DEFAULT_COLOR,
        color:theme.PICKER_TEXT_COLOR
    }

});
