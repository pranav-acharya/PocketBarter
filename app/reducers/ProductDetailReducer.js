import { 
	GET_PRODUCT_DETAILS_REQUEST,
	GET_PRODUCT_DETAILS_SUCCESS,
	GET_OWNER_DETAILS_SUCCESS,
	ADD_SAVED_PRODUCT_SUCCESS,
	REMOVE_SAVED_PRODUCT_SUCCESS,
 } from '../actions/constants';
import { defaultLocation } from '../config/commons';
// get saved produts from Async store?
const initialState = {
    productImages: [],
    product:{
    	product:{
			location:{
    			location:defaultLocation
    		}	
    	},
    	distance:''
    },
    userDetails:{
        username:'',
        profileImageURI:''
    },
    userInfo:{

    }

};

export default function ProductDetailsReducer(state = initialState, action){
	// For all functions make sure you also update the searched Products list to incorporate the "Saved" information
	switch(action.type){
		case GET_PRODUCT_DETAILS_REQUEST:
		return{
			...state,
			...action.details
		};

		case GET_PRODUCT_DETAILS_SUCCESS:
		console.log(action.details);
		return{
			...state,	
			...action.details	
		};
		
		case GET_OWNER_DETAILS_SUCCESS:
		return {
			...state,
			userDetails:{
				...state.userDetails,
				...action.userDetails,
			},
			userInfo:{
				...state.userInfo,
				...action.userInfo
			}
		}
		case ADD_SAVED_PRODUCT_SUCCESS:
		return{
			...state,
			product:{
				...state.product,
				saved:true
			}
		}
		case REMOVE_SAVED_PRODUCT_SUCCESS:
		return{
			...state,
			product:{
				...state.product,
				saved:false
			}
		}

		default:
		return state;
	}
}