import { UPDATE_FILTER } from '../actions/constants';
// get saved produts from Async store?

const defaultAvailabilityPeriodInDays = 7;
const javascriptDateStartYear = 1900;
const defaultDistance = 5;
const priceRangeDefault = {
    min:10,
    max:250
};

var startDateObject = new Date();
var endDateObject = new Date();
startDateObject.setDate(startDateObject.getDate() - defaultAvailabilityPeriodInDays);
var start_date = (startDateObject.getYear()+javascriptDateStartYear) 
    + "-" + (startDateObject.getMonth()+1) + "-" + startDateObject.getDate();
endDateObject.setDate(endDateObject.getDate() + defaultAvailabilityPeriodInDays);
var end_date =  (endDateObject.getYear()+javascriptDateStartYear) 
    + "-" + (endDateObject.getMonth()+1) + "-" + endDateObject.getDate();


const initialState =  {
    availability:{
        startDate:start_date,
        endDate:end_date
    },
    sort:0,
    priceRangeSliderValues: [priceRangeDefault.min, priceRangeDefault.max],
    distanceSliderValue: [defaultDistance],
    category:0,
    keyword:'',
    latitude:'',
    longitude:'',
};    


export default function FilterReducer(state = initialState, action){
	// For all functions make sure you also update the searched Products list to incorporate the "Saved" information	
	switch(action.type){
		case UPDATE_FILTER:
		return {
			...state, 
			...action.filter
		}
		
		default:
		return state;
	}
}