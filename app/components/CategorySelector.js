import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { categories } from '../config/data'
import { theme } from '../config/themes'

const iconSize = 30;

export default class CategorySelector extends Component{
	constructor(props){
		
		super(props);
		this.state = {
			categoryId:this.props.initialCategoryId || 0
		}
		console.log("created new",this.state.categoryId)
	}
	categorySelector(categoryId, category){
        return(()=> { 
        	if(this.state.categoryId != categoryId){
        		this.setState({'categoryId':categoryId});
        		this.props.onCategoryChanged(category);	
        	}        	
        })
    }

    getCategoryStyle(categoryId){
        return (categoryId == this.state.categoryId)?styles.categorySelected:styles.categoryDeselected;
    }

	render(){
		return(
			<View style={styles.categoryContainer}>
                {
                    categories.map((category,i) =>(
                        <TouchableOpacity onPress={this.categorySelector(i,category)} style={{flex:1}} key={i}>
                            <View style={[styles.categoryStyle,this.getCategoryStyle(i)]} key={i}>
                                <Ionicon name={category.icon} size={40} style={styles.categoryIcon} />
                                <Text style={{color:theme.PICKER_TEXT_COLOR}}>{category.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                    
                }
            </View>
		)
	}
}

const styles = StyleSheet.create({
    categoryContainer:{
        flexDirection:'row',
        padding:10
    },
    categoryIcon:{
        height:40,
        width:40,
        textAlign:'center',
        color:theme.PICKER_TEXT_COLOR
    },
    categoryStyle:{
        flex:1,
        flexDirection:'column',
        alignItems:'center', 
        justifyContent:'center',
        borderColor:theme.PICKER_BORDER_COLOR,
        borderWidth:1,
        marginRight:5,
        paddingTop:5,
        paddingBottom:5,
    },
    categorySelected : {
        backgroundColor:theme.PICKER_BACKGROUND_SELECTED_COLOR,
    },
    categoryDeselected : {
        backgroundColor:theme.PICKER_BACKGROUND_DEFAULT_COLOR,
    }
});