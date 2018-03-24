import React, { Component } from 'react';
import { ScrollView, Text, Image, View, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, NativeModules, Alert, Modal } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { List, ListItem, Rating,Button, FormInput, FormValidationMessage } from 'react-native-elements';
import { userDetails } from '../../config/data'
import { CommonStyles, deepcopy, RequiredFieldMessage, getImageExtensionFromValue } from '../../config/commons'
import { theme } from '../../config/themes';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import Grid from 'react-native-grid-component';
import {Calendar} from 'react-native-calendars';
import { Products,ExternalServices, ImageService } from '../../config/services'
import CategorySelector from '../../components/CategorySelector';
import Images from '../../assets';
import { connect } from 'react-redux';
import { updateNewProduct } from '../../actions/ActionCreators'

const availabilityMessage = "Please mark the dates on which you want to keep it for yourself. For the remaining dates it will be available in the market";
const MAX_PRODUCT_IMAGES = 6;

class AddNewProductView extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			thumbnail:Images.add_image_camera,
			imageSources:[{dummy:true}],
			price_daily:0,
			price_weekly:0,
			price_monthly:0,
			weeklyDiscountPercentage:-1,
			monthlyDiscountPercentage:-1,
			weekendSurcharge:0,
			productTitle:'',
			productAbout:'',
			productLocation:{
				latitude:this.props.constants.position.coords.latitude,
				longitude:this.props.constants.position.coords.longitude
			},
			markedDates:{},
			productTitleMissingError:false,
			productAboutMissingError:false,
			productImagesMissingError:false,
			category:'',
			uploadProgress:-1,
			modalVisible:false,
		};
	}
	
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
	
	updateSelectedDates(date){
		newMarkedDates = deepcopy(this.state.markedDates);
		if(newMarkedDates[date.dateString]!==undefined){
			newMarkedDates[date.dateString].selected = !newMarkedDates[date.dateString].selected; 
		}else{
			newMarkedDates[date.dateString] = {selected:true};
		}   
		this.setState({markedDates:newMarkedDates});
	}
			
	validateProductDetails(){
		productTitleMissingError = this.state.productTitle.trim().length == 0;
		productAboutMissingError = this.state.productAbout.trim().length == 0;
		productImagesMissingError = this.state.imageSources.length == 0;
		this.setState({productTitleMissingError});
		this.setState({productAboutMissingError});
		this.setState({productImagesMissingError});
		var errorExists = productAboutMissingError || productAboutMissingError || productImagesMissingError;
		return errorExists;
	}
		 
 	updateProduct(){
		var that = this;
		var errorExists = this.validateProductDetails();
		//if(errorExists) return;

		var productImages = [this.state.thumbnail].concat(this.state.imageSources);
		this.setModalVisible(true);
		//remove the dummy image
		productImages.pop();


		var total_data = []; // stores the total number of bytes required to be uploaded
		var progress_data = []; // stores the number of bytes uploaded
		var response_objects = []; // stores the response of each Image Upload
		for( var i=0;i<productImages.length;i++){
			total_data[i] = 0;
			progress_data[i] = 0;
			response_objects[i] = {};
		}
		
		// Upload the images first using the ImageService
		for( var i=0;i<productImages.length;i++){
			
			ImageService.uploadImage(productImages[i],
				function dummy(idx){
					return (progressEvent) => {
						if(total_data[idx] == 0 ) total_data[idx] = progressEvent.total;
						progress_data[idx]  = progressEvent.loaded;
					}
				}(i),
				function dummy(idx){
					return (responseJson) => {
						response_objects[idx] = responseJson;
					}
				}(i),
				function dummy(idx){
					return (err) => {
						console.log(err);
						
					}
				}(i)
				
			)
		 
				
		}

		// The interval reads the status from the progress and updates it on the UI
		// Once the progress reached is 100 the product upload Request is made.
		var updateInterval = setInterval(()=>{
			// get the least value of the total_data
			// if it is 0, it implies that the request for that image hasn't been made. 
			var minTotal = total_data.reduce((acc,prog) => (Math.min(acc,prog)));
			if(minTotal>0){
				var overallProgress = progress_data.reduce((acc,prog) => (acc + prog));
				var overallTotal = total_data.reduce((acc,total) => (acc + total));
				var overallProgressPercentage = overallProgress * 100 / overallTotal;
				that.setState({uploadProgress:overallProgressPercentage});

				var additionalProductImages = response_objects.map((object)=>(object.photo_id + "." + getImageExtensionFromValue(object.ext)));
				var thumbnail_image = additionalProductImages.splice(0,1)[0];

				if(overallProgressPercentage >= 100){
					clearInterval(updateInterval);
					Products.updateProduct({
						title:this.state.productTitle,
						about:this.state.productAbout,
						price_daily:this.state.price_daily,
						price_weekly:this.state.price_weekly,
						price_monthly:this.state.price_monthly,
						other_images:additionalProductImages,
						thumbnail:thumbnail_image,
						weekendSurcharge:this.state.weekendSurcharge,
						markedDates:this.state.markedDates,
						productLocation:this.state.productLocation,
						category:this.state.category.value
					},(responseJson)=>{
						console.log(responseJson);
						
						Alert.alert(
							'Product Status',
							'Posted Successfully. Press OK to proceed to the homepage ',
							[
								{
									text: 'OK', 
									onPress: () => {
										this.props.navigation.navigate("LoadingScreen");
										this.setState({modalVisible: false});
									}
								},
							],
							{ cancelable: false }
						);
					},(err)=>{
						console.log(err);
						this.setState({modalVisible: false});
						Alert.alert("An error occurred while uploading product:" + err);
					})
				}
			}		
			
		},500);
				
 	}
		

	showPicker(pickerName){
		var ImagePicker = require('react-native-image-picker');
		var options = {
			title: 'Select Product Image',
			customButtons: [/*{name: 'fb', title: 'Choose Photo from Facebook'},*/],
			storageOptions: {
				skipBackup: true,
				path: 'images'
			},
			quality:0.4,
			noData:true,
			mediaType:'photo'
		};

		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			/*else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}*/
			else {
				let source = { uri: response.uri, filename:response.fileName };

				if(pickerName=='Thumbnail'){
					this.setState({'thumbnail':source});
				}else{
					var sources = this.state.imageSources;					
					if(sources.indexOf(source)==-1){
						//pop the dummy image
						var dummy = sources.pop();
						sources.push(source);
						if(sources.length < MAX_PRODUCT_IMAGES)
							sources.push(dummy);
						
						this.setState({'imageSources':sources})
					}  
				}
			}
		});
 	}
		
	renderProductImage(imageSources,i){  
			
		if(i < MAX_PRODUCT_IMAGES){
			if(imageSources.dummy){
				return (
					<TouchableOpacity onPress={() => this.showPicker('Other')} style={{width:"33.33%"}} key={i}>
						<Image source={Images.add_image_camera_small} style={{height:100,width:'100%',borderColor:'gray',borderWidth:1}} resizeMode='center' />
					</TouchableOpacity>
				)
			}else{
				return (
					<TouchableOpacity style={{width:"33.33%"}} key={i} >
						<Image source={imageSources} style={{height:100,width:'100%',borderColor:'white',borderWidth:2}} />
					</TouchableOpacity>
				) 
			}
				
		}
	}

	render() {
		var imagesDOM = [];

		return (
		
		<View style={styles.addNewProductContainer}>

			<Modal
				animationType="none"
				transparent={true}
				visible={this.state.modalVisible}
				onRequestClose={() => {
					console.log('Modal has been closed.');
				}}
			>
				<View style={styles.modalContainerStyle}>
					<View style={styles.modalContentStyle}>
						<Text style={{fontSize:20,color:theme.HEADER_BACKGROUND_COLOR}}>Uploading Images</Text>
						<Text style={{fontSize:24, fontWeight:'bold'}}>{this.state.uploadProgress + '%'}</Text>
						{/*
						<TouchableOpacity
							onPress={() => {
								this.setModalVisible(!this.state.modalVisible);
							}}>
							<Text>Hide Modal</Text>
						</TouchableOpacity>
						*/}
					</View>
				</View>
			</Modal>


			<View style={styles.addNewProductHeader}>
					<TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
							<Ionicon name='md-arrow-back' size={30} style={{height:30,width:30,color:'white'}}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.updateProduct()}>
							<Text style={{color:'white',fontSize:20}}>Post</Text>
					</TouchableOpacity>
			</View>


			<ScrollView>
				<View style={styles.inputContainerStyle}>
					<Text style={styles.inputTitle}>Title</Text>
					<FormInput 
						inputStyle={styles.formInputStyle} 
						containerStyle={styles.formInputContainerStyle}
						onChangeText={(productTitle) => this.setState({productTitle})}
					/>
					<FormValidationMessage>{this.state.productTitleMissingError? RequiredFieldMessage:''}</FormValidationMessage>
				</View>


				<View style={styles.inputContainerStyle}>
					<Text style={styles.inputTitle}>About this product</Text>
					<FormInput 
						multiline
						numberOfLines={4}
						inputStyle={[styles.formInputStyle,{width:'100%'}]} 
						containerStyle={styles.formInputAboutContainerStyle}
						onChangeText ={(productAbout) => this.setState({productAbout}) } />
					<FormValidationMessage>{this.state.productAboutMissingError? RequiredFieldMessage:''}</FormValidationMessage>
				</View>

				<View style={styles.inputContainerStyle}>
						<Text style={styles.inputTitle}>Select a Category</Text>
						<CategorySelector 
							initialCategoryId={0}
							onCategoryChanged={(category) => { console.log(category);this.setState({category});console.log(this.state); }  } />
						<FormValidationMessage>{this.state.productAboutMissingError? RequiredFieldMessage:''}</FormValidationMessage>
				</View>
				<View >
					<Text style={[styles.inputTitle,{padding:10}]}>Product thumbnail</Text>
					<View style={{padding:0,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
						<TouchableOpacity onPress={() => this.showPicker('Thumbnail')} style={{alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'gray',padding:10,width:'90%'}}>
							<Image source={ this.state.thumbnail } style={{height:200,width:'100%',backgroundColor:'white'}} resizeMode='center'/>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{borderColor:'#d3d3d3',borderBottomWidth:1,paddingBottom:10}}>
					<Text style={[styles.inputTitle,{padding:10}]}>Additional product photos</Text>
					<View style={{padding:0}}>
						<Grid
						style={styles.list}
						renderItem={this.renderProductImage.bind(this)}
						data={this.state.imageSources}
						itemsPerRow={3}
						/>
					</View>
					<FormValidationMessage>{this.state.productImagesMissingError? 'Please upload one or more photos':''}</FormValidationMessage>
				</View>
				 

				<View style={styles.inputContainerStyle}>
					<Text style={[styles.inputTitle,{marginBottom:5}]}>Pricing</Text>
					<View style={styles.pricingView}>
						<View style={styles.pricingElement}>
							<Text>Price Per day</Text>
							<View style={styles.inputWithTextStyle}>
								<FormInput 
								inputStyle={styles.priceFormInputStyle} 
								containerStyle={styles.priceInputContainerStyle} 
								keyboardType='numeric'
								onChangeText={(price_daily) => this.setState({price_daily})} 
								/>
									<Text style={styles.unitStyle}>($)</Text>
							</View>
						</View>

						<View style={styles.pricingElement}>
							<Text>Weekly Discount</Text>
							<View style={styles.inputWithTextStyle}>
								<FormInput inputStyle={styles.priceFormInputStyle} containerStyle={styles.priceInputContainerStyle} keyboardType='numeric'/>
								<Text style={styles.unitStyle}>(%)</Text>
							</View>
						</View>

						<View style={styles.pricingElement}>
							<Text>Monthly discount</Text>
							<View style={styles.inputWithTextStyle}>
								<FormInput inputStyle={styles.priceFormInputStyle} containerStyle={styles.priceInputContainerStyle} keyboardType='numeric'/>
								<Text style={styles.unitStyle}>(%)</Text>
							</View>
						</View>

						<View style={styles.pricingElement}>
							<Text>Weekend surcharge</Text>
							<View style={styles.inputWithTextStyle}>
								<FormInput inputStyle={styles.priceFormInputStyle} containerStyle={styles.priceInputContainerStyle} keyboardType='numeric'/>
								<Text style={styles.unitStyle}>(%)</Text>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.inputContainerStyle}>
					<Text style={styles.inputTitle}>Availability</Text>
					<Text style={{textAlign:'center'}}>{availabilityMessage}</Text>
					<Calendar
						style={[styles.calendar]}
						markedDates={this.state.markedDates}
						dayComponent={({date, state}) => {
							return (
								<View style={{flex: 1}}>
									<TouchableOpacity onPress={() => {this.updateSelectedDates(date);}}>
										<Text style={{
											textAlign: 'center',
											textDecorationLine: (this.state.markedDates[date.dateString]!==undefined && this.state.markedDates[date.dateString].selected)? 'line-through' : 'none', 
											color: (this.state.markedDates[date.dateString]!==undefined && this.state.markedDates[date.dateString].selected)? 'gray' : 'black'
										}}>{date.day}</Text>
									</TouchableOpacity>
								</View>
							);
						}}
					/>
				</View>


										

				<View style={styles.inputContainerStyle}>
					<Text style={[styles.inputTitle,{marginBottom:10  }]}>Location</Text>
					<View style ={styles.mapViewContainer}>
						<MapView
							style={styles.mapStyle}
							region={{
							latitude: this.state.productLocation.latitude,
								longitude: this.state.productLocation.longitude,
								latitudeDelta: 0.015,
								longitudeDelta: 0.0121,
							}}>
							<MapView.Marker
								draggable
								coordinate={this.state.productLocation}
								onDragEnd={(e) => {
									this.setState({ productLocation: e.nativeEvent.coordinate });
									myLat = e.nativeEvent.coordinate.latitude;
									myLon = e.nativeEvent.coordinate.longitude;
									ExternalServices.getReverseGeoCoding(
										myLat,
										myLon,
										successFn = (responseJson)=>{
											var locationAddress = responseJson.results[0].formatted_address;
											this.setState({locationAddress});
											console.log(responseJson);
										},
										failureFn = (err)=>{
											console.log(err);
										}
									)
								}}
								title={"Pickup location"}
								description={this.state.locationAddress}
							/>
						</MapView>
					</View>
				</View>
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
	addNewProductHeader:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		padding:10,
		backgroundColor:theme.HEADER_BACKGROUND_COLOR,
	},
	addNewProductContainer:{
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
		marginBottom:20,
		marginLeft:0,
		marginRight:0,
		padding:5,
		backgroundColor:theme.GLOBAL_BACKGROUND_COLOR,
		borderBottomWidth:0,
		height:120
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
	mapViewContainer: {
			height: 200,
			width: '100%',
			justifyContent: 'flex-end',
			alignItems: 'center',
	},
	mapStyle: {
			...StyleSheet.absoluteFillObject,
	},
	inputWithTextStyle:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
	},
	unitStyle:{
		width:30,
		padding:0,
	},
	modalContainerStyle:{
		backgroundColor:'gray',
		opacity:0.8,
		flex: 1,
      	flexDirection: 'column',
	 	justifyContent: 'center',
      	alignItems: 'center',

	},
	modalContentStyle:{
		backgroundColor:'white',
  		flexDirection: 'column',
 		justifyContent: 'center',
  		alignItems: 'center',
  		padding:10,
  	}

});

function mapStateToProps(state){
	return {
		...state.NewProductReducer,
		constants:state.ConstantsReducer
	}
}
function mapDispatchToProps(dispatch){
	return{
		updateNewProduct:(product) => dispatch(updateNewProduct(product)),
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(AddNewProductView);




