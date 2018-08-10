import { 
    INITIALIZE_CONSTANTS,
    BUSY_INDICATOR,
    INCOMING_PRODUCTS_REQUEST,
    INCOMING_PRODUCTS_FAILURE,
    INCOMING_PRODUCTS_SUCCESS,

    OUTGOING_PRODUCTS_REQUEST,
    OUTGOING_PRODUCTS_FAILURE,
    OUTGOING_PRODUCTS_SUCCESS,
} from '../actions/constants';

const initialState = {
    'incoming':[],
    'outgoing':[]
};
export default function ProductRequestsReducer(state = initialState, action){
    // For all functions make sure you also update the searched Products list to incorporate the "Saved" information
    switch(action.type){
        case INCOMING_PRODUCTS_SUCCESS:
        return {
            ...state,
            'incoming':action.incoming
        }

        case OUTGOING_PRODUCTS_SUCCESS:
        return {
            ...state,
            'outgoing':action.outgoing
        }

        default:
        return state;
    }
}