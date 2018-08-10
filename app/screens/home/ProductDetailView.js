import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, Image,TouchableOpacity, Alert } from 'react-native';
import { List, ListItem, Rating, Button } from 'react-native-elements';
import { productDetail } from '../../config/data'
import ProductReview from '../../components/ProductReview'
import Ionicon from 'react-native-vector-icons/Ionicons';
import { CDN_URL,CommonStyles } from '../../config/commons'
import { theme } from '../../config/themes';
import MapView from 'react-native-maps';
import { Products, User } from '../../config/services';
import ImageSlider from 'react-native-image-slider';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { getProductDetails, getOwnerDetails, saveProduct, unSaveProduct } from '../../actions/ActionCreators';

const footerHeight = 50;
const sectionPadding = 10;
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

const dummyMarkers = {
    '2018-02-28': {selected: true, startingDay:true, color: 'blue'},
    '2018-03-01': {selected: true, color: 'blue'},
    '2018-03-02': {selected: true, color: 'blue'},
    '2018-03-03': {selected: true, endingDay:true, color: 'blue'},
    '2018-02-24': {selected: true, marked: true, selectedColor: 'blue'},
    '2018-02-23': {selected: true, marked: true, selectedColor: 'blue'},
};

class ProductDetailView extends Component {

    generateMarkedDates(dates){
        var markedDates = {};
        dates.forEach(function(oDate){
            markedDates[oDate] = {selected:true, selectedColor:'red', disabled:true}
        });
        return markedDates;
    }

    constructor(props){
        super(props);
        console.log(this.props.navigation.state.params);
        console.log("constructed product detail view")
        this.state = {
            productImages: [],
            product:this.props.navigation.state.params,
            userDetails:{
                username:'',
                profileImageURI:''
            },
            markedDates:this.generateMarkedDates(this.props.navigation.state.params.inventory.availability.dates)
        }

    }
    handlePress(){
        if(this.props.product.saved){
            this.props.unSaveProduct(this.state.product)
        }else{
            this.props.saveProduct(this.state.product)
        }
    }
    
    openRequestDialog(){

    }

    componentDidMount(){
        this.props.getProductDetails(this.state);
    }

    render() {
        var inventoryDom = [];
        console.log(this.state.product.inventory.availability);
        this.state.product.inventory.rates.map((inventory,i) => {
            inventoryDom.push(
                <View style={{flexDirection:'row',justifyContent:'space-between'}} key={i}>
                    <Text>{inventory.type}</Text>
                    <Text style={{textAlign:'right'}}>{inventory.amount}</Text>
                </View>
            );
        })

    return (
    <View style={styles.productDetailViewContainer}>
        <ScrollView 
        style={styles.productDetailViewBody}
        onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
                // Alert.alert("Scrolled to bottom!!");
                // Load Product by here!
                // Load reviews here!
                if(this.props.userDetails.username.length === 0){
                    console.log(this.state);
                    this.props.getOwnerDetails(this.state);
                }
                
            }
        }}
        scrollEventThrottle={0}
        >
        <View style={styles.productHeader}>
            <Ionicon 
                name="ios-arrow-back" 
                size={30} style={CommonStyles.backButtonStyle}
                onPress={() =>  this.props.navigation.dispatch(NavigationActions.back())}
            />
            <Ionicon 
                name="md-share" 
                size={30} style={[styles.shareButtonStyle,CommonStyles.backButtonStyle]}
                onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
            />
            <Ionicon 
                name="ios-heart" 
                size={30} style={[styles.saveButtonStyle,CommonStyles.backButtonStyle,(this.props.product.saved)?styles.saveStyle:styles.unsaveStyle]}
                onPress={() => this.handlePress()}
            />    
            <ImageSlider images={this.props.productImages} style={styles.productDetailStyle}/>
            
        </View>
        <View style={styles.productNameWrapper}>
            <Text style={{fontWeight:'bold',fontSize:20}}>{this.props.product.product.name}</Text>
        </View>

        
        <View style={styles.productLocationStyle}>
            <Ionicon name='ios-pin' size={30} style={{height:30,width:30}} />
            <Text style={{fontWeight:'bold'}}>{productDetail.location + ' ' + this.props.product.distance + ' kms'}</Text>
        </View>
        <View style={{flexDirection:'column',borderColor:'#d3d3d3',borderBottomWidth:1,padding:sectionPadding}}>
            <Text style={{fontWeight:'bold',marginBottom:5}}>Price</Text>
            {inventoryDom}
    
        </View>
        
    

        <View style={styles.aboutProductWrapper}>
            <Text style={{fontWeight:'bold'}}>About this product</Text>
            <Text>{this.props.product.product.description}</Text>
        </View>

        <View style={styles.inputContainerStyle}>
            <Text style={styles.inputTitle}>Availability</Text>
            <Calendar
                style={[styles.calendar]}
                markedDates={ this.state.markedDates }
                markingType={'period'}
            />
        </View>

        {this.props.userDetails.username.length > 0 &&
        <View>
        <View style={styles.productOwnerContainer}>
            <View>
                <Text>
                    <Text>{'Product By '}</Text>
                    <Text 
                    onPress={() => this.props.navigation.navigate('UserView',{'userInfo':this.props.userInfo})}
                    style={{color:theme.LINK_COLOR}}>
                        {this.props.userDetails.username}
                    </Text>
                </Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Rating
                  type="star"
                  fractions={1}
                  startingValue={productDetail.owner.rating}
                  readonly
                  imageSize={20}
                  ratingColor={theme.HEADER_BACKGROUND_COLOR}
                  ratingBackgroundColor={theme.HEADER_BACKGROUND_COLOR}
                  onFinishRating={this.ratingCompleted}
                  style={{ paddingVertical: 10 }}
                />
                <Text style={{fontSize:18,marginLeft:5}}>({productDetail.owner.reviewCount})</Text>
                </View>

            </View>
            <View style={styles.productOwnerWrapper}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('UserView',{'userInfo':this.props.userInfo})} >
                <Image 
                    resizeMode='contain'
                    source={{uri:this.props.userDetails.profileImageURI}} 
                    style={styles.productOwnerStyle}/>
                </TouchableOpacity>
                
            </View>
        </View>
        
        

        <View style={styles.productReviewsWrapper}>
            <Text style={{marginBottom:10,fontWeight:'bold'}}>Product Reviews</Text>
            {
                productDetail.reviews.map((review,i) => (
                    <ProductReview review={review} key={i}/>
                ))
            }
        </View>

        <View style ={styles.mapViewContainer}>
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: parseFloat(this.props.product.product.location.location.latitude),
            longitude: parseFloat(this.props.product.product.location.location.longitude),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
            <MapView.Marker
                coordinate={{
                    latitude: parseFloat(this.props.product.product.location.location.latitude),
                    longitude: parseFloat(this.props.product.product.location.location.longitude),
                }}
                title={"Found Here"}
                description={"Product description"}
            />
        </MapView>
        </View>
        </View>}

        {false &&
        <View style={styles.similarProductsWrapper}>
            <Text style={{marginBottom:10 + footerHeight,fontWeight:'bold'}}>Similar products nearby</Text>
        </View>
        }

        
        
      </ScrollView>
      
        <View style={styles.productAvailabilityFooter}>
            <Text style={{ flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:20}}>{ productDetail.dailyRate }</Text>
                <Text> per day</Text>
            </Text>
            <Button
                small
                raised
                buttonStyle={styles.availabilityButtonStyle}
                title='Contact Owner' 
                onPress={()=> this.props.navigation.navigate('Calendar',{'productInfo':this.state.product,'markedDates':this.state.markedDates}) }/>

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    productDetailViewBody:{
        backgroundColor:theme.GLOBAL_BACKGROUND_COLOR,
    },
    productAvailabilityFooter:{
        position:'absolute',
        height:footerHeight,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'white',
        flex:1,
        padding:sectionPadding,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        shadowColor: '#000',
        shadowOffset: {width: 2, height:3 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 10
    },
    availabilityButtonStyle:{
        backgroundColor:theme.BUTTON_BACKGROUND_COLOR,
        height:30,
    },
    productDetailStyle: {
        width:'100%',
        height:250,
        backgroundColor:'black'
    },
    productLocationStyle:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        borderColor:theme.SEPARATOR_COLOR,
        alignItems:'center',
        borderTopWidth:1,
        borderBottomWidth:1,
        padding:sectionPadding
    },
    productOwnerContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderColor:theme.SEPARATOR_COLOR,
        borderBottomWidth:1,
        padding:sectionPadding
    },
    productOwnerWrapper:{
        flexDirection:'column',
        alignItems:'center'
    },
    productRates:{
        flex:1,
        flexDirection:'column',
    },
    productOwnerStyle:{
        height:50,
        width:50
    },
    productNameWrapper:{
        padding:sectionPadding,
    },
    aboutProductWrapper:{
        padding:sectionPadding,
        borderBottomWidth:1,
        borderColor:theme.SEPARATOR_COLOR
    },
    productReviewsWrapper:{
        padding:sectionPadding
    },
    saveStyle:{
        color:theme.SAVE_COLOR,
    },
    unsaveStyle:{
        color:theme.UNSAVE_COLOR
    },
    shareButtonStyle:{
        right:20,
    },
    saveButtonStyle:{
        right:70,
    },
    similarProductsWrapper:{
        padding:sectionPadding
    },
    mapViewContainer: {
        height: 200,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
    },

});
function mapStateToProps(state){
    return state.ProductDetailReducer
}
function mapDispatchToProps(dispatch){
    return{
        getProductDetails:(product) => dispatch(getProductDetails(product)),
        getOwnerDetails:(product) => dispatch(getOwnerDetails(product)),
        saveProduct:(product) => dispatch(saveProduct(product)),
        unSaveProduct:(product) => dispatch(unSaveProduct(product)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductDetailView);