import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions, AsyncStorage, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { List, ListItem, FormInput } from 'react-native-elements';
import { CommonStyles, IOS_PADDING_TOP, ChatAttributes, AsyncStorageKeys } from '../../config/commons';
import { theme } from '../../config/themes';
import { connect } from 'react-redux';
import { loadChatHistory, sendMessage, visitMessages } from '../../actions/ActionCreators';
import { sendChatMessage } from '../../config/ChatService'
import Ionicon from 'react-native-vector-icons/Ionicons';
import Moment from 'react-moment';


const chat_port = 8085;
const chat_host = "localhost";
const chat_url = 'ws://'+chat_host+':'+chat_port+'/ws'
const chatFooterHeight = 50;
const sendButtonWidth = 100;


class ChatView extends Component {
	constructor(props){
		super(props);
		this.state = {
			msg : '',
			user_id:this.props.navigation.state.params.user_id,
		}
	}
	
	sendMessage(){

		// For offline messages, store it in async storage
		const key = AsyncStorageKeys.CHAT;
		var chatData = {};
		chatData[ChatAttributes.MESSAGE] = this.state.msg;
		chatData[ChatAttributes.RECEIVER_ID] = this.state.user_id;// receiver user
		chatData[ChatAttributes.SENDER_ID] = this.props.constants.user_id;//current user
		

		sendChatMessage(chatData);
		this.setState({'msg':''});

	}
	goBack(){
		// dispatch an event which marks the messages visited
		this.props.visitMessages(this.state.user_id);
    	this.props.navigation.dispatch(NavigationActions.back());
    }
  render() {

    var {height, width} = Dimensions.get('window');
  	var chatDOM = [];
  	var user_id = this.state.user_id;
    var i =0;
    var that = this;
    while(i<this.props.chat[user_id].length){ 
		var chat = this.props.chat[user_id][i];

		chatDOM.push
		(
		    <View key={i} style={
		    	[
		    		styles.chatItemWrapper,
		    		chat[ChatAttributes.SENDER_ID]==that.props.constants.user_id?styles.selfChatStyle:styles.otherChatStyle
		    	]
		    }>
		    	<View style={styles.chatItemStyle}>
		            <Text style={styles.chatTextStyle}>{chat[ChatAttributes.MESSAGE]}</Text>
		            <View style={styles.chatMetadataStyle}>		            	
		            	{/*<Text style={styles.chatTimeStyle}>{chat[ChatAttributes.LOADING] == undefined? 'sent': (chat[ChatAttributes.LOADING] == 1)? 'pending':'sent'}	</Text>*/}
		            	<Moment element={Text} unix fromNow style={styles.chatStatusStyle}>{chat[ChatAttributes.TIMESTAMP]}</Moment>
		            </View>
	            </View>	
		    </View>
		) 
		i++;
    }


    return (

    	<View>
        	<View style={styles.chatHeader}>
        	
	            <TouchableOpacity onPress={() => this.goBack()}>
	                <Ionicon name='md-arrow-back' size={30} style={{height:30,width:30,color:'white'}}/>
	            </TouchableOpacity>
	            <TouchableOpacity onPress={() => this.updateProduct()}>
	                <Text style={{color:'white',fontSize:20}}>Chat</Text>
	            </TouchableOpacity>
           	</View>
           	<ScrollView style={{
           		height:height - chatFooterHeight - chatFooterHeight - (Platform.OS === 'ios'?IOS_PADDING_TOP:0),
           		elevation:-1,
           		backgroundColor:'white',
        		}}
        		ref={ref => this.scrollView = ref}
        		onContentSizeChange={(contentWidth, contentHeight)=>{        
			        	this.scrollView.scrollToEnd({animated: true});
				    }
				}>
       			{  chatDOM	}
           	</ScrollView>
           	
           	<View style={styles.chatFooterStyle}>
	            <FormInput 
	            	value={this.state.msg}
        			multiline
                  	numberOfLines={4}
	              	inputStyle={[styles.formInputStyle,{width:"100%"}]} 
	              	containerStyle={[styles.formInputAboutContainerStyle,{width:width - sendButtonWidth}]}
             	 	onChangeText ={(msg) => this.setState({msg}) } />
	          	<TouchableOpacity onPress={() => this.sendMessage()} style={{width:sendButtonWidth}}>
	                <Text style={{color:'black',fontSize:20}}>Send</Text>
            	</TouchableOpacity>
            </View>
        </View>
        
    );
  }
}

const styles = StyleSheet.create({
    chatHeader:{
      	flexDirection:'row',
      	alignItems:'center',
      	justifyContent:'space-between',
      	padding:10,
      	backgroundColor:theme.HEADER_BACKGROUND_COLOR,
      	height:chatFooterHeight,
      	elevation: 10
    },
    formInputStyle:{
    	color:'black',
    	
    },
    formInputAboutContainerStyle:{
    	height:'98%',
    	borderColor:'black',
    	borderWidth:1
    },
    chatFooterStyle:{
    	borderColor:'gray',
    	borderTopWidth:1,
        height:chatFooterHeight,
        backgroundColor:'white',
        padding:5,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        shadowColor: '#000',
        shadowOffset: {width: 2, height:3 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 10
    },

    chatItemStyle:{
    	backgroundColor:'#FFFFCC',
    	paddingTop:5,
    	paddingBottom:5,
    	paddingLeft:5,
    	paddingRight:5,
    	borderColor:'#CCCC99',
    	borderWidth:1,
    	borderRadius:4,
    	
    },
    chatMetadataStyle:{
    	flexDirection:'row',
    	justifyContent:'flex-end',
    },
    selfChatStyle:{
    	justifyContent:'flex-end'
    },
    otherChatStyle:{
    	justifyContent:'flex-start'
    },
    chatItemWrapper:{
    	flex:1,
    	flexDirection:'row',
    	padding:2,
    },
    chatStatusStyle:{
    	color:'gray'
    },
    chatTimeStyle:{
    	color:'gray'
    },
    chatTextStyle:{
    	fontSize:16,
    }
});

function mapStateToProps(state){
    return {
    	...state.ChatReducer,
    	constants:state.ConstantsReducer	
    }
}
function mapDispatchToProps(dispatch){
    return{
        loadChatHistory:() => dispatch(loadChatHistory()),
        sendMessage:(message) => dispatch(sendMessage(message)),
        visitMessages:(target_user_id) => dispatch(visitMessages(target_user_id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ChatView);
