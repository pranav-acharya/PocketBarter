import React, { Component } from 'react';
import { ScrollView, Text,StyleSheet, View, TouchableOpacity, Animated, Easing, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import ProductTile from '../../components/ProductTile'
import SearchAndFilterComponent from '../../components/SearchAndFilterComponent'
import { allProductsList } from '../../config/data'
import { theme } from '../../config/themes'
import MapView from 'react-native-maps';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements'
import { Products } from '../../config/services';
import { getDistanceFromLatLonInKm } from '../../config/commons'
import { searchProducts, saveProduct, unSaveProduct, loadSavedProducts } from '../../actions/ActionCreators';
import { connect } from 'react-redux';

const productViewButtonStyle = {position:'absolute',right:10,bottom:80,zIndex:10};
const productViewButtonSize = 20;

class AllProductsView extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            productView:true,
            currentLocation:this.props.constants.position.coords,
        };

    }   

    componentDidMount(){
        this.props.loadSavedProducts(this.state.currentLocation);
        this.searchProducts("");
    }
    
    searchProducts = (text) => {
        
        this.props.searchProducts({
            ...this.props.filter,
            latitude:this.props.constants.position.coords.latitude,
            longitude:this.props.constants.position.coords.longitude,
            keyword:text,
        })
    }
    

    renderProductsGrid = () => {     
        
        return (
            <ScrollView style={{backgroundColor:'#f1f1f1'}}>
               <Grid
                style={styles.list}
                renderItem={
                    (product,i) => {
                        return (
                        <ProductTile product={product} 
                        key={i} 
                        onPress={
                            function dummy(product,props){
                                return ()=>props.navigation.navigate('ProductDetailView',product)
                            }(product,this.props)
                        }
                        callbackFn={(saved_products)=> this.callbkFn(saved_products)}
                        onSave={
                            function dummy(product,props){
                                return function(){
                                    props.saveProduct(product);
                                }
                            }(product,this.props)
                        }
                        onUnSave={
                            function dummy(product,props){
                                return function(){
                                    props.unSaveProduct(product);
                                }
                            }(product,this.props)
                        }
                        saved={product.saved}
                        />
                        )
                    }

                }
                data={this.props.searched}
                itemsPerRow={2}
                />
            </ScrollView>
        )
    }
    renderProductsMap = () => {
        //console.log(this.props.searched);
        console.log(parseFloat(this.props.searched[0].product.location.location.latitude))
        console.log(parseFloat(this.props.searched[0].product.location.location.longitude))
        console.log(parseFloat(this.state.currentLocation.latitude));
        console.log(this.state.currentLocation.longitude);
        return (
            <View style ={styles.mapViewContainer}>
                <MapView
                  style={styles.mapStyle}
                  region={{
                    latitude: this.state.currentLocation.latitude,
                    longitude: this.state.currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                {this.props.searched.map((product,i) => (

                    <MapView.Marker
                        coordinate={{
                            latitude: parseFloat(product.product.location.location.latitude),
                            longitude: parseFloat(product.product.location.location.longitude),
                        }}
                        title={"Found Here"}
                        description={"Product description"}
                        key={i}
                    />
                    ))}
                </MapView>
            </View>
        );
    }
    render(){
        
        return(
            <View style={{flex:1}}>
                <SearchAndFilterComponent 
                    onFilterButtonPress={() => this.props.navigation.navigate('Filter')} 
                    onAddButtonPress={() => this.props.navigation.navigate('AddNewProductView')}
                    onSubmitSearch={(text) => this.searchProducts(text)}                    
                    />
                
                {!this.props.searched_loading && this.props.searched.length > 0 && this.state.productView && this.renderProductsGrid()}
                {this.props.searched_loading && <ActivityIndicator />}
                {!this.props.searched_loading && this.props.searched.length > 0 && !this.state.productView && this.renderProductsMap()}                    
                {!this.props.searched_loading && this.props.searched_error!=='' && <View style={styles.centerAll}><Text>{this.props.searched_error}</Text></View>}
                {!this.props.searched_loading && this.props.searched.length === 0 && this.props.searched_error==='' && <View style={styles.centerAll}><Text>No search results</Text></View>}
                <TouchableOpacity onPress={() => this.setState({productView:!this.state.productView})} style={productViewButtonStyle}>
                    <Icon 
                        raised
                        name='ios-pin-outline'
                        type='ionicon' 
                        size={productViewButtonSize} 
                        style={{color:theme.ICON_DEFAULT_COLOR}}
                    />
                </TouchableOpacity>
            </View>
        );    
    }
}


const styles = StyleSheet.create({
    centerAll: {
        justifyContent:'center',
        alignItems:'center',
        height:'80%'
    },
    list: {
        flex: 1,  
    },
    mapViewContainer: {
        height: '100%',
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
    },
});
function mapStateToProps(state){
    return {
        ...state.ProductsReducer,
        filter:state.FilterReducer,
        constants: state.ConstantsReducer,
    }
}
function mapDispatchToProps(dispatch){
    return{
        searchProducts:(searchOptions) => dispatch(searchProducts(searchOptions)),
        saveProduct:(product) => dispatch(saveProduct(product)),
        unSaveProduct:(product) => dispatch(unSaveProduct(product)),
        loadSavedProducts:(currentLocation) => dispatch(loadSavedProducts(currentLocation))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllProductsView);


