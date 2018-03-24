import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	GET_OWNER_DETAILS_REQUEST,
	GET_OWNER_DETAILS_SUCCESS,
	GET_OWNER_DETAILS_FAILURE,
	GET_CURRENT_USER_REQUEST,
	GET_CURRENT_USER_SUCCESS,
	GET_CURRENT_USER_FAILURE
} from "../actions/constants";
import Images from "../assets";

// get saved produts from Async store?
const initialState = {
	current_user: {
		thumbnail: Images.default_user,
		fname: "",
		lname: "",
		email: "",
		mobile: "",
		location: ""
	},
	owner: {},
	owner_loading: false,
	owner_error: ""
};

export default function UserReducer(state = initialState, action) {
	// For all functions make sure you also update the searched Products list to incorporate the "Saved" information
	switch (action.type) {
		case GET_CURRENT_USER_SUCCESS:
			action.user.thumbnail =
				action.user.thumbnail === ""
					? Images.default_user
					: action.user.thumbnail;
			return {
				...state,
				current_user: action.user
			};
		case GET_OWNER_DETAILS_REQUEST:
			return {
				...state,
				owner: {},
				owner_error: "",
				owner_loading: true
			};
		case GET_OWNER_DETAILS_SUCCESS:
			return {
				...state,
				owner_loading: false,
				owner: {
					...state.owner,
					...action.user
				}
			};
		case GET_OWNER_DETAILS_FAILURE:
			return {
				...state,
				owner_loading: false,
				owner_error: action.error
			};
		default:
			return state;
	}
}
