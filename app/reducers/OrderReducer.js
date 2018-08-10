import { CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST } from '../actions/constants';
import Images from '../assets'
// get saved produts from Async store?
const initialState = {
	orderProcessing: false,
	orderSuccessful: false
};

export default function OrderReducer(state = initialState, action){
	// For all functions make sure you also update the searched Products list to incorporate the "Saved" information
	switch(action.type){
		case CREATE_ORDER_REQUEST:
		return {
			...state,
			orderProcessing: true
		}

		case CREATE_ORDER_SUCCESS:
		return{
			...state, 
			orderSuccessful: true,
			orderProcessing: false
		};

		case CREATE_ORDER_FAILURE:
		return{
			...state, 
			orderSuccessful: false,
			orderProcessing: false,
		};
		
		default:
		return state;
	}
}