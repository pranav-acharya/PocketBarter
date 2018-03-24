import { Alert, AsyncStorage } from 'react-native';
import { allProductsList, productDetailNew, savedProductsList,loggedInUserProfile, productsAndUsersResponse } from '../config/data'

const host = 'localhost';
const port = '8080';
const auth_port = '8089';
const version = 'v1';
const file_upload_port = '8090';


const defaultRadius = 5;
var productUploadRequestData = {
  "prd_map": 0,
  "product": {
    "prd_map": 0,
    "prd_info": {
      "prd_uuid": "",
      "user_uuid": "string",
      "name": "string",
      "price": "string",
      "description": "string",
      "location": {
        "address": {
          "address_street": "string",
          "address_street_2": "string",
          "city": "string",
          "state": "string",
          "zip": "string",
          "country": "string"
        },
        "location": {
          "latitude": "string",
          "longitude": "string",
          "radius": "string"
        }
      }
    }
  },
  "inventory": {
    "item_map": 0,
    "item": {
      "product_id": "",
      "availability": {
        "dates": []
      },
      "rates": [],
      "active": true,
      "created_at": "string",
      "updated_at": "string"
    }
  }
};



export const Products = {
    addSavedProduct: (product,success,failure)=>{
        /*
        AsyncStorage.getItem("saved_products")
        .then((saved_products)=>{
            var saved_products_array = [];
            if(saved_products !=null){
              saved_products_array = JSON.parse(saved_products);
              this.setState({'saved':true});
            }
            //console.log("Saving",product.prd_uuid);
            saved_products_array.push(product.prd_uuid);
            console.log(JSON.stringify(saved_products_array));
            AsyncStorage.setItem("saved_products",JSON.stringify(saved_products_array));
            success(product);
        })
        .catch((err)=>{
            console.log(err);
            failure(err);
        });*/
        setTimeout(function(){
            success(product);
        },100);
    },
    removeSavedProduct: (product,success,failure)=>{
        /*
        AsyncStorage.getItem("saved_products").
        then((saved_products)=>{
            if(saved_products !=null){
                saved_products_array = JSON.parse(saved_products);
                this.setState({'saved':false});
                console.log(product);
                console.log("Removing",product.prd_uuid);

                saved_products_array.splice(saved_products_array.indexOf(product.prd_uuid), 1);
                //console.log(saved_products_array);
                AsyncStorage.setItem("saved_products",JSON.stringify(saved_products_array));
                this.props.callbackFn(saved_products_array);
                success();
            }
        }).
        catch((err)=>{
            failure(err);
        });*/
         setTimeout(function(){
            success(product);
        },100);
    },
    loadSavedProducts:(success,failure) => {
        setTimeout(function(){
            success({products:savedProductsList});
        },1500);
    },
    searchProducts: (searchOptions,success,failure) => {
        setTimeout(function(){
            success({products:allProductsList});
        },1000);  
    },
    getProduct: (product_id,success,failure) => {
        setTimeout(function(){
            success(allProductsList[0]);
        },1000)
    },
    getProducts: (product_ids,success,failure) => {
        setTimeout(function(){
            success(allProductsList);
        },1000)
    },
    getProductsAndUsersInfo: (product_ids,success,failure) => {
        setTimeout(function(){
            success(productsAndUsersResponse);
        },1000)
    },
    updateProduct: (updatedProduct,success,failure) => {
        AsyncStorage.getItem("user_id").then((user_id) => {

            if(user_id===null)  return;
            var current_timestamp = new Date().getTime();
            productUploadRequestData.inventory.item.created_at = current_timestamp + "";
            productUploadRequestData.inventory.item.updated_at = current_timestamp + "";
            Object.keys(updatedProduct.markedDates).forEach((key) => {
                if(updatedProduct.markedDates[key].selected){
                    productUploadRequestData.inventory.item.availability.dates.push(key);
                }
            })
            productUploadRequestData.product.prd_info.user_uuid = user_id;
            productUploadRequestData.product.prd_info.name = updatedProduct.title;
            productUploadRequestData.product.prd_info.description = updatedProduct.about;
            productUploadRequestData.product.prd_info.category = updatedProduct.category;
            productUploadRequestData.product.prd_info.price = updatedProduct.pricePerDay + "";
            productUploadRequestData.product.prd_info.location.location.latitude = updatedProduct.productLocation.latitude+"";
            productUploadRequestData.product.prd_info.location.location.longitude = updatedProduct.productLocation.longitude+""; 
            productUploadRequestData.product.prd_info.location.location.radius = defaultRadius+"";
            // TODO: add validations for numeric types
            if(updatedProduct.pricePerDay!== -1){
                productUploadRequestData.inventory.item.rates.push({
                    "type": "DAILY",
                    "amount": updatedProduct.pricePerDay+"",
                    "currency": "RESERVED"
                })
            }

            if(updatedProduct.weeklyDiscountPercentage!== -1){
                productUploadRequestData.inventory.item.rates.push({
                    "type": "WEEKLY",
                    "amount": updatedProduct.weeklyDiscountPercentage+"",
                    "currency": "RESERVED"
                })
            }
            
            if(updatedProduct.monthlyDiscountPercentage!==-1){
                productUploadRequestData.inventory.item.rates.push({
                    "type": "MONTHLY",
                    "amount": updatedProduct.weeklyDiscountPercentage+"",
                    "currency": "RESERVED"
                })
            }

            console.log(JSON.stringify(productUploadRequestData));
            fetchAPI("http://" + host + ":" +port + "/"+version+"/update_product", 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(productUploadRequestData)
            },(responseJson)=>{
                console.log(responseJson);
                var product_uuid = responseJson.product.prd_uuid;
                for(var i=0;i<updatedProduct.imageSources.length;i++){
                    var imageSource = updatedProduct.imageSources[i];
                    if (imageSource) 
                    {
                        var data = new FormData();
                        data.append('file', {uri: imageSource.uri, name: imageSource.filename, type: 'image/jpeg'});
                        data.append('user_id',user_id);     
                        data.append('parent_id',product_uuid);
                        data.append('is_thumbnail',i==0? 'true':'false');
                        var config = {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'multipart/form-data',
                            },
                            body: data,
                        };
                        //fetchAPI("http://"+host+":"+file_upload_port+"/"+version+"/upload", 
                        var successFn = (response) => { console.log("Done!")};
                        if(i==updatedProduct.imageSources.length - 1){
                            successFn = success
                        }
                        fetchAPI("http://"+host+":"+file_upload_port+"/"+version+"", 
                            config,
                            successFn,
                            (err)=>{console.log(err);},
                            true);
                        
                    }
                }
            },failure,true);    
        })
        
    },

};

export const User = {
    createUser:(user,success,failure) =>{
        setTimeout(function(){
            success(user);
        },1000);
    },
    getUser: (uuid,success,failure) => {
        setTimeout(function(){
            success(loggedInUserProfile);
        },1000);
       
    },
    register: (user,success,failure) => {
        
    },
    authenticate: (user,success,failure)=>{
        setTimeout(function(){
            success({jwt_token:"DUMMY_TOKEN", user_id:"DUMMY_USER_ID"});
        },1000)
    },
    forgotPassword:(username,success,failure) => {
        
    },
    verify:(verificationCode,success,failure) => {
        
    }

}

const myApiKey = "AIzaSyBvappRDgkBmUyFQwevLZva3o9N-cKfDFU";
export const ExternalServices = {

    getReverseGeoCoding: (lat,long,success,failure) => {

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            var locationAddress = responseJson.results[0].formatted_address;
            //console.log(responseJson);
            success(responseJson);
        })
        .catch((err) =>{
            failure(err);
        })
    }
}