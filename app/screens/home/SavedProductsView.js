import React, { Component } from 'react';
import { ScrollView, Text, View,StyleSheet,AsyncStorage, ActivityIndicator } from 'react-native';
import { Header } from 'react-native-elements';
import ProductTile from '../../components/ProductTile';
import { savedProductsList } from '../../config/data';
import Grid from 'react-native-grid-component';
import SearchAndFilterComponent from '../../components/SearchAndFilterComponent'
import { User, Products } from '../../config/services';
import { getDistanceFromLatLonInKm } from '../../config/commons'
import { theme } from '../../config/themes';
import { connect } from 'react-redux';
import { loadSavedProducts,saveProduct, unSaveProduct } from '../../actions/ActionCreators'
class SavedProductsView extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    // Note : it is necessary to add a closure function for onSave and onUnSave, this is because once it is assigned,
    // it is only executed when the action happens and hence even if the grid is modified, the function parameters within do not change
    // Hence we inject the new product values( triggered on render) into the function to make sure it doesn't take the older ones
    _renderItem = (product,i) => {
        product.saved = true;
        console.log("rendering item",product);
        return (
            <ProductTile 
            product={product} 
            key={i} 
            onPress={()=>this.props.navigation.navigate('ProductDetailView')}
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
            saved={product.saved === undefined? false:product.saved}
            />
        )
    }
    
    
    render() {        
        return (
            <View style={{flex:1}}>
                <View style={styles.savedProductsHeader}>
                    <Text style={styles.headerTitle}>Saved Products</Text>
                </View>


                {this.props.saved_loading && <ActivityIndicator />}
                {!this.props.saved_loading && this.props.saved_error!=='' && <View style={styles.centerAll}><Text>{this.props.saved_error}</Text></View>}
                {!this.props.saved_loading && this.props.saved.length === 0 && this.props.saved_error==='' && <View style={styles.centerAll}><Text>No search results</Text></View>}
                
                {!this.props.saved_loading && this.props.saved.length > 0 && 
                    <ScrollView style={{backgroundColor:'#f1f1f1'}}>
                      <Grid
                        style={styles.list}
                        renderItem={this._renderItem}
                        data={this.props.saved}
                        itemsPerRow={2}
                        />

                    </ScrollView>
                }                    
                
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        height: 160,
        margin: 1,
    },
    list: {
        flex: 1,
    },
    headerTitle:{
        fontSize:24,
        color:theme.GLOBAL_BACKGROUND_COLOR
    },
    savedProductsHeader:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:theme.HEADER_BACKGROUND_COLOR,
    },
    centerAll: {
        justifyContent:'center',
        alignItems:'center',
        height:'80%'
    },
});

function mapStateToProps(state){
    return state.ProductsReducer
}
function mapDispatchToProps(dispatch){
    return{
        loadSavedProducts:() => dispatch(loadSavedProducts()),
        saveProduct:(product) => dispatch(saveProduct(product)),
        unSaveProduct:(product) => dispatch(unSaveProduct(product)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SavedProductsView);


