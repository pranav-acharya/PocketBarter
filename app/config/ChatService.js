const chat_port = 8085;
const chat_host = '192.168.1.14';
const chat_url = 'ws://'+chat_host+':'+chat_port+'/v1/ws'
const retry_interval_in_ms = 1000;

var ws;
var connectionEstablished = false;

export function connectChat(user_id){
	ws = new WebSocket(chat_url + "?user_id="+user_id);
	ws.onopen = () => {
	  // connection opened
	  // ws.send('something'); // send a message
	  connectionEstablished = true;
	  console.log("connected");
	};

	ws.onerror = (e) => {
	  // an error occurred
	  console.log(e.message);
	};

	ws.onclose = (e) => {
	  // connection closed
	  // should retry connecting 
	  console.log(e.code, e.reason);
	  setTimeout(function(){
	  	ws = new WebSocket(chat_url + "?user_id="+user_id);
	  },retry_interval_in_ms)
	};
}
export function onReceiveMessage(receiveMessageCallback){
	ws.onmessage = (e) => {
		receiveMessageCallback(e);
	}
}
export function sendChatMessage(message){
	ws.send(JSON.stringify(message));
}
