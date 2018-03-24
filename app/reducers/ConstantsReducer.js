import { INITIALIZE_CONSTANTS,BUSY_INDICATOR } from '../actions/constants';
import { defaultLocation } from '../config/commons';

import Images from '../assets'
// get saved produts from Async store?
const initialState = {
	'position':{
		coords:defaultLocation
	},
	'user_id':'',
	'saved_products':[],
	'login_success':false,
	'busy_indicator':false,
};
export default function ConstantsReducer(state = initialState, action){
	// For all functions make sure you also update the searched Products list to incorporate the "Saved" information
	switch(action.type){
		case INITIALIZE_CONSTANTS:
		return {
			...state,
			...action.constants
		};
		
		case BUSY_INDICATOR:
		return {
			...state,
			'busy_indicator':action.visible,
		}
		default:
		return state;
	}
}