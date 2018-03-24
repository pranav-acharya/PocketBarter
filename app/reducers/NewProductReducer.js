import { SET_NEW_PRODUCT_DETAILS } from '../actions/constants';
import Images from '../assets'
// get saved produts from Async store?
const initialState = {
	thumbnail:Images.add_image_camera,
	imageSources:[{dummy:true}],
	base64imageData:[],
	pricePerDay:0,
	weeklyDiscountPercentage:-1,
	monthlyDiscountPercentage:-1,
	weekendSurcharge:0,
	productTitle:'',
	productAbout:'',
	productLocation:{
  		latitude:'',
  		longitude:''
	},
	markedDates:{},
	productTitleMissingError:false,
	productAboutMissingError:false,
	productImagesMissingError:false,
	category:''
};

export default function NewProductReducer(state = initialState, action){
	// For all functions make sure you also update the searched Products list to incorporate the "Saved" information
	switch(action.type){
		case SET_NEW_PRODUCT_DETAILS:
		return{
			details:{...state, ...action.product},
		};
		
		default:
		return state;
	}
}