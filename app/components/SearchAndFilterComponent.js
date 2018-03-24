import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { SearchBar } from 'react-native-elements'
import Ionicon from 'react-native-vector-icons/Ionicons';
import { CommonStyles } from '../config/commons';
import { theme } from '../config/themes';

export default class SearchAndFilterComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            text:""
        }
    }
    render(){
        return(
            <View style={styles.searchBarWrapper}>
                <View style={{flex:1,flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity onPress={() => this.props.onAddButtonPress()} >
                        <Ionicon name='ios-add-circle-outline' size={30} style={[styles.iconStyle,{textAlign:'right'}]} />
                    </TouchableOpacity>
                </View>
                <SearchBar 
                    containerStyle={styles.searchBarContainerStyle} 
                    inputStyle={styles.searchBarInputStyle}
                    placeholder='Search products'
                    onChangeText={(text) => this.setState({text})}
                    onSubmitEditing={() => this.props.onSubmitSearch(this.state.text)}
                />
                <View style={{flex:1,flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity onPress={() => this.props.onFilterButtonPress()} >
                        <Ionicon name='ios-options' size={30} style={styles.iconStyle} />
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    iconStyle:{
        height:30,
        width:30,
        color:theme.HEADER_TEXT_COLOR,
    },
    searchBarWrapper:{
        height:60,
        flexDirection:'row',
        backgroundColor:theme.HEADER_BACKGROUND_COLOR,
        alignItems:'center',
        width:'100%'
    },
    searchBarContainerStyle:{
        backgroundColor:theme.HEADER_BACKGROUND_COLOR,
        flex:5,
        flexDirection:'column',
        borderColor:theme.HEADER_BACKGROUND_COLOR,
        borderTopWidth:0,
        borderBottomWidth:0,
        paddingLeft:0,
        paddingRight:0,
    },
    searchBarInputStyle:{
        backgroundColor:'white',
        borderColor:theme.HEADER_BACKGROUND_COLOR,
    }

});