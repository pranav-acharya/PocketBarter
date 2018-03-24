import { Alert, AsyncStorage } from 'react-native';
import { categories } from './data'
const host = '192.168.1.14';
const port = '8080';
const auth_port = '8089';
const version = 'v1';
const file_upload_port = '8090';

const fetchWithProgress = (url, opts={}, onProgress) => {

    return new Promise( (res, rej)=>{
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        for (var k in opts.headers||{})
            xhr.setRequestHeader(k, opts.headers[k]);
        xhr.onload = e => res(e.target);
        xhr.onerror = rej;
        if (xhr.upload && onProgress)
            xhr.upload.onprogress = onProgress; 
        xhr.send(opts.body);
    });
}

fetchAPI = (url,options,success,failure,requiresToken) => {
    if(requiresToken){
        AsyncStorage.getItem("jwt_token").then((token) => {
            if(token!==null){
                //console.log("sending req");
                if(options.headers === undefined || options.headers ===null){
                    options.headers = { Authorization: token }
                }else{
                    options.headers.Authorization = token;                    
                }
                
                fetch(url,options)
                .then((response) => {
                    //console.log(response);                    
                    return response.json()
                })
                .then((responseJson) => {
                    //console.log(token)
                    //console.log(responseJson.code)
                    //console.log(responseJson.code === 16)
                    if(responseJson.code === 16){
                        // code for invalid token = 16


                        // Ideally use refresh token and get a new access token
                        // But that is not working yet, so that has been commented out below
                        // and we ask the user to restart the app (check if you can make him navigate to a specific screen using navigationActions)
                        AsyncStorage.removeItem('jwt_token', (err) => console.log('removed jwt_token', err));
                        AsyncStorage.removeItem('user_id', (err) => console.log('removed user_id', err));
                        Alert.alert("Please re-open the application!");
                        /*
                        AsyncStorage.getItem("user_id").then((user_id) => {
                            //console.log(user_id)
                            fetch('http://'+host+":"+auth_port+"/"+version+"/"+"refresh_token",{
                                method:"POST",
                                body:JSON.stringify({
                                    "user_id":user_id,
                                    "jwt_token":token
                                })
                            })
                            .then((response) => {
                                console.log(response);
                                return response.json()
                            })
                            .then((responseJson) => {
                                console.log(responseJson)
                                AsyncStorage.setItem("user_id",responseJson.user_id);
                                AsyncStorage.setItem("jwt_token",responseJson.jwt_token);
                                fetchAPI(url,options,success,failure,requiresToken);
                            })
                            .catch((err) => {
                                console.log(err);
                                console.log("Error while refreshing the token")
                            })
                        })
                        */
                    }else{
                        success(responseJson);
                    }
                    
                })
                .catch((error)=>{
                    failure(error);
                    // check if token expired and request for access token?
                    // store refresh token when?
                })
            }else{
                console.log("Could not find token");
            }
        });
    }else{
        fetch(url,options)
        .then((response) => response.json())
        .then((responseJson) => {
            success(responseJson);
        })
        .catch((error)=>{
            failure(error);
        })
    }
    
}

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

export const ImageService = {
    uploadImage:(imageSource,onProgress,success,failure) => {
        if (imageSource) 
        {
            var data = new FormData();
            data.append('file', {uri: imageSource.uri, name: imageSource.filename, type: 'image/jpeg'});
            var config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: data,
            };
           
            fetchWithProgress("http://"+host+":"+file_upload_port+"/"+version+"/multipart_image_upload", 
                config,
                (progress) => onProgress(progress),
            ).then(
                (res) => success(JSON.parse(res.response)), 
                (err) => failure(JSON.parse(res.response))
            );
            
        }
    }
};

export const Products = {
    addSavedProduct: (product,success,failure)=>{
        AsyncStorage.getItem("saved_products")
        .then((saved_products)=>{
            var saved_products_array = [];
            if(saved_products !=null){
              saved_products_array = JSON.parse(saved_products);
            }
            //console.log("Saving",product.prd_uuid);
            //console.log(product);
            saved_products_array.push(product.product.prd_uuid);
            //console.log(JSON.stringify(saved_products_array));
            AsyncStorage.setItem("saved_products",JSON.stringify(saved_products_array));
            success(product);
        })
        .catch((err)=>{
            console.log(err);
            failure(err);
        });
    },
    removeSavedProduct: (product,success,failure)=>{
        AsyncStorage.getItem("saved_products").
        then((saved_products)=>{
            if(saved_products !=null){
                saved_products_array = JSON.parse(saved_products);
                saved_products_array.splice(saved_products_array.indexOf(product.product.prd_uuid), 1);
                AsyncStorage.setItem("saved_products",JSON.stringify(saved_products_array));
                success(product);
            }
        }).
        catch((err)=>{
            failure(err);
        });
    },
    loadSavedProducts:(success,failure) => {
        AsyncStorage.getItem("saved_products").
        then((saved_products)=>{
            // get the products
            if(saved_products != null){
                var saved_product_ids = JSON.parse(saved_products);

                if(saved_product_ids.length > 0){
                    Products.getProducts(saved_product_ids,
                    (responseJson)=>{
                        console.log(responseJson);
                        success(responseJson);
                    },
                    (err)=>{
                        failure(err);
                    }) 
                }else{
                    success({products:[]});
                }  
            }else{
                success({products:[]});
            }           
        }).catch((err)=>{
            failure(err);
        })
    },
    searchProducts: (searchOptions,success,failure) => {
        searchOptionsObj = {
            lat:searchOptions.latitude + "",
            long:searchOptions.longitude + "",
            radius:searchOptions.radius || 5,
            name:searchOptions.name || ""
        };
        
        
        var searchQueryString = 'lat='+searchOptionsObj.lat+'&lon='+searchOptionsObj.long+'&radius='+searchOptionsObj.radius+'&name='+searchOptionsObj.name;
        searchQueryString += (searchOptions.category > 0)? ('&category='+categories[searchOptionsObj.category].value) : '';
        console.log(searchQueryString);
        fetchAPI('http://' + host + ':' +port + '/'+version+'/search?'+searchQueryString, 
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },success,failure,true);    
    },
    getProduct: (product_id,success,failure) => {
        fetchAPI("http://" + host + ":" +port + "/"+version+"/get_product/"+product_id+"", 
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },success,failure,true);
    },
    getProducts: (product_ids,success,failure) => {

        var uuids = [];
        product_ids.map((product_id) => {
            uuids.push({uuid:product_id});
        });
        console.log(uuids);
        fetchAPI("http://" + host + ":" +port + "/"+version+"/get_products", 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body:JSON.stringify({
                'uuids':uuids
            })
        },success,failure,true);
    },
    getProductsAndUsersInfo: (product_ids,success,failure) => {

        var uuids = [];
        product_ids.map((product_id) => {
            uuids.push({uuid:product_id});
        });
        console.log(uuids);
        fetchAPI("http://" + host + ":" +port + "/"+version+"/get_products_and_users", 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body:JSON.stringify({
                'uuids':uuids
            })
        },success,failure,true);
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
            productUploadRequestData.product.prd_info.price = updatedProduct.price_daily + "";
            productUploadRequestData.product.prd_info.location.location.latitude = updatedProduct.productLocation.latitude+"";
            productUploadRequestData.product.prd_info.location.location.longitude = updatedProduct.productLocation.longitude+""; 
            productUploadRequestData.product.prd_info.location.location.radius = defaultRadius+"";
            productUploadRequestData.product.prd_info.thumbnail = updatedProduct.thumbnail;
            productUploadRequestData.product.prd_info.other_images = updatedProduct.other_images;
            // TODO: add validations for numeric types
            if(updatedProduct.pricePerDay!== -1){
                productUploadRequestData.inventory.item.rates.push({
                    "type": "DAILY",
                    "amount": updatedProduct.price_daily+"",
                    "currency": "RESERVED"
                })
            }

            if(updatedProduct.weeklyDiscountPercentage!== -1){
                productUploadRequestData.inventory.item.rates.push({
                    "type": "WEEKLY",
                    "amount": updatedProduct.price_weekly+"",
                    "currency": "RESERVED"
                })
            }
            
            if(updatedProduct.monthlyDiscountPercentage!==-1){
                productUploadRequestData.inventory.item.rates.push({
                    "type": "BI_WEEKLY",
                    "amount": updatedProduct.price_monthly+"",
                    "currency": "RESERVED"
                })
            }
            console.log(productUploadRequestData);
            fetchAPI("http://" + host + ":" +port + "/"+version+"/update_product", 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(productUploadRequestData)
            },
            success,
            failure,
            true);    
        })
        
    },

};

export const User = {
    createUser:(user,success,failure) =>{
        fetchAPI('http://' + host + ':' +port + '/'+version+'/update_user', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                user_map:0,
                user_info:{
                    user_uuid:user.user_id,
                    fname: user.fname,
                    lname:user.lname,
                    email:user.email,
                    mobile:user.mobile,
                    location:{
                        address:{
                            address_street:"",
                            city:"",
                            state:"",
                            zip:"",
                            country:""
                        },
                        location:{
                            latitude:'',
                            longitude:''
                        }
                    }
                }
            })  
        },
        successFn = (responseJson) =>{
            console.log(responseJson)
            var user_id = responseJson.user_uuid;
            var data = new FormData();
            data.append('file', {uri: user.profileImage.uri, name: user.profileImage.filename, type: 'image/jpeg'});    
            data.append('user_id',user_id);
            data.append('parent_id',user_id);

            var config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: data,
            };
            //fetchAPI("http://"+host+":"+file_upload_port+"/"+version+"/upload", 
            fetchAPI("http://"+host+":"+file_upload_port+"/"+version+"", 
                config,
                success,
                (err)=>{console.log(err);},
                true);
        }
        ,failure,true);
    },
    getUser: (uuid,success,failure) => {
        console.log('getUserUUID',uuid);
        fetchAPI('http://' + host + ':' +port + '/'+version+'/get_user/'+uuid, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },success,failure,true);
       
    },
    register: (user,success,failure) => {
        fetchAPI('http://' + host + ':' +auth_port + '/'+version+'/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                username: user.username,
                password:user.password,
                type:'EMAIL'                
            })    
         },success,failure,false);
    },
    authenticate: (user,success,failure)=>{
        fetchAPI('http://' + host + ':' +auth_port + '/'+version+'/authenticate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                "type": "EMAIL",
                "username": user.username,
                "password": user.password
            })    
         },success,failure,false);
    },
    forgotPassword:(username,success,failure) => {
        fetchAPI('http://' + host + ':' +auth_port + '/'+version+'/forgot_password/'+username, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }    
         },success,failure,false);
    },
    verify:(verificationCode,success,failure) => {
        fetchAPI('http://' + host + ':' +auth_port + '/'+version+'/verify/'+verificationCode, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }    
         },success,failure,false);
    },
    saveProduct:(product_id,success,failure) =>{
        fetchAPI('http://' + host + ':' +port + '/'+version+'/save_product/'+product_id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }    
         },success,failure,true);
    },
    unSaveProduct:(product_id,success,failure) =>{
        fetchAPI('http://' + host + ':' +port + '/'+version+'/unsave_product/'+product_id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }    
         },success,failure,true);
    },
    getSavedProducts: (user_id,success,failure) => {
        fetchAPI('http://' + host + ':' +port + '/'+version+'/get_saved_products/'+user_id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }    
         },success,failure,true);
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