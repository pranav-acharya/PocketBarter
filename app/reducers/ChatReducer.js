import {
	SEND_MESSAGE_REQUEST,
	SEND_MESSAGE_SUCCESS,
	SEND_MESSAGE_FAILURE,
	
	RECEIVED_MESSAGE,

	CHAT_HISTORY_SUCCESS,
	CHAT_VISITED,

	MESSAGES_INFO_REQUEST,
	MESSAGES_INFO_SUCCESS,
	MESSAGES_INFO_FAILURE,
} from '../actions/constants';

// need the chat to have a user_id -> chat_messages[] mapping where.
// Approach 1: { user_id_1: [ {},{} ]}
// Apporach 2: chat object =  { user_id:'',messages:[]}
const initialState = {
	chat:{

	},
	metadataList:[
	]
};

export default function ChatReducer(state = initialState, action){
	// For all functions make sure you also update the searched Products list to incorporate the "Saved" information
	switch(action.type){
		case RECEIVED_MESSAGE:
		console.log(action.message);
		var target_user_id = action.target_user_id;
		var previous_chat = state.chat[target_user_id] || [];
		var new_chat = {};
		// if sender is self, then use receiver ID
		new_chat[target_user_id] = 
		[
			...previous_chat,
			action.message
		];
		console.log(new_chat);
		return {
			...state,
			chat:{
				...state.chat,
				...new_chat
			},
			

		};
		

		case SEND_MESSAGE_SUCCESS:
		var user_id = action.message.receiver_id;
		return {
			...state,
			user_id:state[user_id].map((message)=>{
				// if it matches the chat id, change the status to delivered to server
				return message;
			})
		}

		case CHAT_HISTORY_SUCCESS:

		var chatHistoryObj = action.chat;
		return {
			...state,
			chat:chatHistoryObj
		};

		case CHAT_VISITED:
		var target_user_id = action.target_user_id;
		var new_chat = {};
		new_chat[target_user_id] = state.chat[target_user_id].map((chat) => {
			chat["v"] = 1
			return chat;
		});
		return {
			...state,
			chat:{
				...state.chat,
				...new_chat
			}

		}

		case MESSAGES_INFO_SUCCESS:
		var metadataList = action.metadataList;
		return {
			...state,
			metadataList:metadataList
		}
		default:
		return state;
	}
}