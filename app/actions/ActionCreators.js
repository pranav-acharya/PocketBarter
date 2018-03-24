import { 
	ADD_SAVED_PRODUCT_REQUEST,
	ADD_SAVED_PRODUCT_SUCCESS,
	ADD_SAVED_PRODUCT_FAILRUE,
	
	REMOVE_SAVED_PRODUCT_REQUEST,
	REMOVE_SAVED_PRODUCT_SUCCESS,
	REMOVE_SAVED_PRODUCT_FAILURE,
	
	GET_SAVED_PRODUCTS_REQUEST,
	GET_SAVED_PRODUCTS_SUCCESS,
	GET_SAVED_PRODUCTS_FAILURE,

	SET_USER,
	SET_USER_FAILURE,

	UPDATE_USER,
	UPDATE_FILTER,
	UPDATE_PRODUCT_CREATION,
	SET_PRODUCT_DETAILS,

	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,

	GET_OWNER_REQUEST,
	GET_OWNER_SUCCESS,
	GET_OWNER_FAILURE,

	SEARCH_PRODUCTS_REQUEST,
	SEARCH_PRODUCTS_SUCCESS,
	SEARCH_PRODUCTS_FAILURE,

	GET_CURRENT_USER_REQUEST,
	GET_CURRENT_USER_SUCCESS,
	GET_CURRENT_USER_FAILURE,

	SET_NEW_PRODUCT_DETAILS,

	GET_PRODUCT_DETAILS_REQUEST,
	GET_PRODUCT_DETAILS_SUCCESS,
	GET_PRODUCT_DETAILS_FAILURE,

	GET_OWNER_DETAILS_REQUEST,
	GET_OWNER_DETAILS_SUCCESS,
	GET_OWNER_DETAILS_FAILURE,
	
	SEND_MESSAGE_REQUEST,
	SEND_MESSAGE_SUCCESS,
	SEND_MESSAGE_FAILURE,
	
	RECEIVED_MESSAGE,
	CHAT_HISTORY_REQUEST,
	CHAT_HISTORY_SUCCESS,

	INITIALIZE_CONSTANTS,
	CHAT_VISITED,

	MESSAGES_INFO_REQUEST,
	MESSAGES_INFO_SUCCESS,
	MESSAGES_INFO_FAILURE,

	BUSY_INDICATOR
} from './constants';
//import { Products, User } from '../config/services';
import { Products, User } from '../config/MockServices';
import { months, CDN_URL,getDistanceFromLatLonInKm } from '../config/commons';
import { AsyncStorage } from 'react-native';
export function saveProduct(product){
	// Api call to save product
	return (dispatch) => {
		dispatch({
			type:ADD_SAVED_PRODUCT_REQUEST,
		});

		Products.addSavedProduct(product,
		(saved_product)=> {
			product.saved = true;
			dispatch({
				type:ADD_SAVED_PRODUCT_SUCCESS,
				"product":product,
			});
		},
		(err)=>{
			dispatch({
				type:ADD_SAVED_PRODUCT_FAILURE,
				error:err.message || 'Something went wrong',
			});
		});
	}
	
	
}

export function busyIndicator(visible){
	dispatch({
		type:BUSY_INDICATOR,
		visible:visible
	})

}

export function createUser(user,successFn,failure){
	return (dispatch) => {
		dispatch({
			type:BUSY_INDICATOR,
			visible:true
		});
		User.createUser(
	    	user,
	    	(responseJson) => {
	    		dispatch({
					type:BUSY_INDICATOR,
					visible:false
				})
	    		successFn(responseJson);
	    	},
	    	(err) => {
	    		dispatch({
					type:BUSY_INDICATOR,
					visible:false
				})
	    		failure(err);
	    	}
		)	
	}
}

export function authenticate(user,successFn,failure){
	
	return (dispatch) => {
		dispatch({
			type:BUSY_INDICATOR,
			visible:true
		});
		User.authenticate(
        	user,
        	(responseJson) => {
        		dispatch({
					type:BUSY_INDICATOR,
					visible:false
				})
        		successFn(responseJson);
        	},
        	(err) => {
        		dispatch({
					type:BUSY_INDICATOR,
					visible:false
				})
        		failure(err);
        	}
		)	
	}
	
}
export function unSaveProduct(product){
	// Api call to save product
	return (dispatch) => {
		dispatch({
			type:REMOVE_SAVED_PRODUCT_REQUEST,
		});

		Products.removeSavedProduct(product,
		(saved_product)=> {
			product.saved = false;
			dispatch({
				type:REMOVE_SAVED_PRODUCT_SUCCESS,
				"product":product,
			});
		},
		(err)=>{
			dispatch({
				type:REMOVE_SAVED_PRODUCT_FAILURE,
				error:err.message || 'Something went wrong',
			});
		});
	}
}

export function loadSavedProducts(current_location){
	return (dispatch) => {
		dispatch({
			type:GET_SAVED_PRODUCTS_REQUEST,
		});

		Products.loadSavedProducts(
		(responseJson)=>{
			responseJson.products.map((product)=>{
				product["distance"] = getDistanceFromLatLonInKm(
										current_location.latitude,
										current_location.longitude,
										product.product.location.location.latitude,
										product.product.location.location.longitude
									);
				product["distance"] = product["distance"].toFixed(2);
				return product;
			})
			
			dispatch({
				type:GET_SAVED_PRODUCTS_SUCCESS,
				products:responseJson.products,
			})
		},
		(err)=>{
			dispatch({
				type:GET_SAVED_PRODUCTS_FAILURE,
				error:err.message || 'Something went wrong',
			})
		});
	}
	
	
}

export function getUserDetails(user_id){
	return (dispatch) => {
		dispatch({
			type:GET_CURRENT_USER_REQUEST,
		});

		User.getUser(
		user_id,
		(user)=>{
			//console.log(user);
			var creation_date = user.created_on;
            var splits = creation_date.split("-");
            user.membership = months[parseInt(splits[1])] + ' ' + splits[0];
            user.thumbnail = user.thumbnail.trim().length == 0? "": { uri: CDN_URL + user.thumbnail };
            user.location = Object.values(user.location.address).join(" ").trim();
			dispatch({
				type:GET_CURRENT_USER_SUCCESS,
				"user":user,
			})
		},
		(err)=>{
			dispatch({
				type:GET_CURRENT_USER_FAILURE,
				error:err.message || 'Something went wrong',
			})
		});
	}

	var user = {};
	var creation_date = responseJson.created_on;
    var splits = creation_date.split("-");
    user.membershipValue = months[parseInt(splits[1])] + ' ' + splits[0];
	
}

export function getProductOwnerDetails(user_id){
	var user = {};
	return {
		type: SET_OWNER,
		user
	}
}

export function updateUserDetails(user){
	// Use API call to update the user and call the action with the response
	var receivedUser = {};
	return {
		type: SET_USER,
		receivedUser
	}
}

export function searchProducts(filter){
	// Use API to update 
	console.log(filter);
	return (dispatch) => {
		dispatch({
			type:SEARCH_PRODUCTS_REQUEST,
		});
		dispatch({
			type: UPDATE_FILTER,
			filter
		});

		Products.searchProducts(
		filter,
		(responseJson)=>{
			// Add distance to each product
			responseJson.products.map((product)=>{
				product["distance"] = getDistanceFromLatLonInKm(
										filter.latitude,
										filter.longitude,
										product.product.location.location.latitude,
										product.product.location.location.longitude
										);
				product["distance"] = product["distance"].toFixed(2);
				return product;
			})
			
			dispatch({
				type:SEARCH_PRODUCTS_SUCCESS,
				products:responseJson.products,
			})
		},
		(err)=>{
			dispatch({
				type:SEARCH_PRODUCTS_FAILURE,
				error:err.message || 'Something went wrong',
			})
		});
	}
}

export function updateNewProduct(product){
	return {
		type:SET_NEW_PRODUCT_DETAILS,
		newProduct:product
	}
}

export function getProductDetails(product){
	return (dispatch) =>{
		dispatch({
			type:GET_PRODUCT_DETAILS_REQUEST,
			product:product
		});
		
		Products.getProduct(
            product.product.product.prd_uuid,
            (product_details) => {
                //console.log(product);
                dispatch({
					type:GET_PRODUCT_DETAILS_SUCCESS,
					details:product
				});
                
            },
            (err) =>{
                dispatch({
					type:GET_PRODUCT_DETAILS_FAILURE,
					error:err.message || 'Something went wrong'
				});
            }
        )
	}
}

export function getOwnerDetails(productObj){
	return (dispatch) => {
		dispatch({
			type:GET_OWNER_DETAILS_REQUEST
		});
		//console.log(productObj);
		User.getUser(productObj.product.product.user_uuid,
            successFn = (responseJson)=>{
                //console.log(responseJson);
                dispatch({
                	type:GET_OWNER_DETAILS_SUCCESS,
                    userDetails:{
                        username:responseJson.fname,
                        profileImageURI:CDN_URL + responseJson.thumbnail,
                    },
                    userInfo:responseJson
                });
            },
            errorFn = (err) =>{
                dispatch({
					type:GET_OWNER_DETAILS_FAILURE,
					error:err.message || 'Something went wrong'
				});
            }) 
	}
}

export function sendMessage(message){
	return (dispatch) => {
		dispatch({
			type:SEND_MESSAGE_REQUEST,
			message:message
		});

	}
}

export function receivedMessage(message,target_user_id){
	
	console.log(message);
	return {
		type:RECEIVED_MESSAGE,
		message,
		target_user_id
	}
}
export function visitMessages(target_user_id){
	// get the items from async storage, remove the key "v" for each chat item for the target id
	
	return dispatch => {

		AsyncStorage.getItem('chat').
		then((chatObj) => {
			var chatHistoryObject = JSON.parse(chatObj) || {};
			var targetUserChat = chatHistoryObject[target_user_id];
			targetUserChat = targetUserChat.map((chat_message)=>{
				delete chat_message["v"]
				return chat_message
			});
			// CHeck if this is necessary after performing the above
			// chatHistoryObject[target_user_id] = targetUserChat;
			AsyncStorage.setItem('chat',JSON.stringify(chatHistoryObject));

			AsyncStorage.SET_USER_FAILURE
			dispatch({
				type:CHAT_VISITED,
				target_user_id
			})
		});
		
	}
	
}
export function loadChatHistory(){
	return (dispatch) => {
		dispatch({
			type:CHAT_HISTORY_REQUEST
		});
		AsyncStorage.getItem('chat').
		then((chatObj) => {
			var chatHistoryObject = JSON.parse(chatObj) || {};
			dispatch({
				type:CHAT_HISTORY_SUCCESS,
				chat:chatHistoryObject
			})
		});

	}
}

export function initializeConstants(constants){
	return {
		type:INITIALIZE_CONSTANTS,
		constants
	}
}

export function loadMessageMetadata(){
	// Assumes that the chat would have loaded already
	return (dispatch) => {
		
		AsyncStorage.getItem('chat').
		then((chatObj) => {
			var chatHistoryObject = JSON.parse(chatObj) || {};
			dispatch({
				type:MESSAGES_INFO_REQUEST
			});
			var product_ids = Object.keys(chatHistoryObject);
			// Call API
			if(product_ids.length > 0){
				Products.getProductsAndUsersInfo(
					product_ids,
					(responseJson) => {
						dispatch({
							type:MESSAGES_INFO_SUCCESS,
							metadataList:responseJson.prodAndUserInfoList
						})
					},
					(err) => {
						dispatch({
							type:MESSAGES_INFO_FAILURE,
							error:err.message || 'Something went wrong'
						})
					}

				)	
			}else{
				dispatch({
					type:MESSAGES_INFO_SUCCESS,
					metadataList:[]
				})
			}
			

		});
		
	}
}