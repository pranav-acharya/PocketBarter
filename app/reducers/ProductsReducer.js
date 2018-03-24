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

	SEARCH_PRODUCTS_REQUEST,
	SEARCH_PRODUCTS_SUCCESS,
	SEARCH_PRODUCTS_FAILURE,


} from '../actions/constants';
// get saved produts from Async store?
const initialState = { 
	saved: [], 
	saved_loading:false,
	saved_error:'',
	searched:[],
	searched_loading:false,
	searched_error:'',
}

export default function ProductsReducer(state = initialState, action){
	// For all functions make sure you also update the searched Products list to incorporate the "Saved" information
	switch(action.type){
		case GET_SAVED_PRODUCTS_REQUEST:
		return{
			...state,
			saved_error:'',
			saved_loading:true,
			saved:[],
		};
		case GET_SAVED_PRODUCTS_FAILURE:
		return {
			...state,
			saved_loading:false,
			saved_error:action.error
		}
		case GET_SAVED_PRODUCTS_SUCCESS:
		//console.log(state.saved);
		// check the searchedProducts and update saved info

		var saved_products =action.products;
		var new_searched = [];
		/*
		if(state.searched.length > 0){
			new_searched = state.searched.map(product=>{
				// NOTe: THIS does not work, to create a copy, destruct the object using ...product
				//var new_product = product;
				var new_product = product;
				for(var i=0;i<saved_products.length;i++){
					if(product.product.prd_uuid==saved_products[i].product.prd_uuid){

						new_product = {
							...product,
							saved:true
						}
						break;
					}	

				}
				return new_product;			
			})
		}*/
		if(state.searched.length > 0){
			
			return{
				...state,
				saved_loading:false,
				saved:saved_products,
				searched:state.searched.map(product=>{
					// NOTe: THIS does not work, to create a copy, destruct the object using ...product
					//var new_product = product;
					var new_product = product;
					for(var i=0;i<saved_products.length;i++){
						if(product.product.prd_uuid==saved_products[i].product.prd_uuid){

							new_product = {
								...product,
								saved:true
							}
							break;
						}	

					}
					return new_product;			
				}),
			};
		}else{
			return{
				...state,
				saved_loading:false,
				saved:saved_products,
			}
		}
		

		case SEARCH_PRODUCTS_REQUEST:
		return{
			...state,
			searched:[],
			searched_error:'',
			searched_loading:true,
		};
		case SEARCH_PRODUCTS_FAILURE:
		return {
			...state,
			searched_loading:false,
			searched_error:action.error
		}
		case SEARCH_PRODUCTS_SUCCESS:
		// add information of whether its saved as well
		var new_searched = [...action.products];
		//console.log(state.saved);		
		if(state.saved !== undefined && state.saved.length > 0){
			new_searched.map(product=>{
				for(var i=0;i<state.saved.length;i++){
					if(product.product.prd_uuid==state.saved[i].product.prd_uuid){
						product.saved = true;
						break;
					}
				}		
			})
		}
		
		return{
			...state,
			saved_error:'',
			searched_loading:false,
			searched:new_searched,
		};

		case ADD_SAVED_PRODUCT_SUCCESS:
		// also update the other views like - (detail? not required) (searcehd - required)
		
		var new_searched;
		var modifiedProductIfExists;
		var modifiedProductIfExistsIndex = -1;
		state.searched.map((product,i)=>{
			if(product.product.prd_uuid==action.product.product.prd_uuid){
				modifiedProductIfExists = Object.assign({},action.product);
				modifiedProductIfExistsIndex = i;
				return;
			}
		})
		if(modifiedProductIfExistsIndex > -1){
			modifiedProductIfExists.saved = true;
			new_searched = [
				...state.searched.slice(0,modifiedProductIfExistsIndex),
				modifiedProductIfExists,
				...state.searched.slice(modifiedProductIfExistsIndex+1)
			]
		}else{
			new_searched = state.searched;
		}
		return{
			...state,
			saved:[...state.saved, action.product],
			searched:new_searched
		};
		case REMOVE_SAVED_PRODUCT_SUCCESS:
		var new_searched;
		var matchedIndex = -1;
		var matchedProduct;
		state.searched.map((product,i)=>{
			//console.log(product.product.prd_uuid==action.product.product.prd_uuid);
			if(product.product.prd_uuid==action.product.product.prd_uuid){
				product.saved = false;
				//product.product.name = "LALALALA";
				matchedIndex = i;
				matchedProduct = Object.assign({},product);
				return;
			}
		})
		if(matchedIndex>-1){
			new_searched = [
				...state.searched.slice(0,matchedIndex),
				matchedProduct,
				...state.searched.slice(matchedIndex+1)
			]
		}else{
			new_searched = state.saved;
		}
		//console.log(new_searched);
		return{
			...state,
			saved:state.saved.filter(p=>p.product.prd_uuid!==action.product.product.prd_uuid),
			searched:new_searched
		};
		

		default:
		return state;
	}
}