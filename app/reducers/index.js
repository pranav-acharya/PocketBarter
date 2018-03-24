import { combineReducers } from 'redux';
import ProductsReducer from './ProductsReducer'
import ProductDetailReducer from './ProductDetailReducer'
import UserReducer from './UserReducer'
import FilterReducer from './FilterReducer'
import NewProductReducer from './NewProductReducer'
import ChatReducer from './ChatReducer'
import ConstantsReducer from './ConstantsReducer'

const rootReducer = combineReducers({
	ProductsReducer,
	ProductDetailReducer,
	UserReducer,
	FilterReducer,
	NewProductReducer,
	ChatReducer,
	ConstantsReducer,
})

export default rootReducer