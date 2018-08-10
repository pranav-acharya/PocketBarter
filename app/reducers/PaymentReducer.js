import { PAYMENT_SUCCESS, PAYMENT_FAILURE, PAYMENT_REQUEST, PAYMENT_RESET } from '../actions/constants';
// get saved produts from Async store?
const initialState = {
	paymentSuccessful:false,
	paymentProcessing:false
};

export default function PaymentReducer(state = initialState, action){
	// For all functions make sure you also update the searched Products list to incorporate the "Saved" information
	switch(action.type){
		case PAYMENT_SUCCESS:
		return { 
			...state, 
			paymentSuccessful:true,
			paymentProcessing:false,
		};
		
		case PAYMENT_FAILURE:
		return { 
			...state, 
			paymentSuccessful:false,
			paymentProcessing:false
		};
		
		case PAYMENT_REQUEST:
		return { 
			...state, 
			paymentProcessing:true
		};

		case PAYMENT_RESET:
		return {
			...state,
			...initialState
		}
		default:
		return state;
	}
}