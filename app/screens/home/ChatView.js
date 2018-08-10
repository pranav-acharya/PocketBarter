import React, { Component } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, AsyncStorage, Platform, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { List, ListItem, FormInput } from 'react-native-elements';
import { CommonStyles, IOS_PADDING_TOP,ANDROID_PADDING_TOP, ChatAttributes, AsyncStorageKeys } from '../../config/commons';
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
const INCOMING = "INCOMING";
const OUTGOING = "OUTGOING";

class ChatView extends Component {
	constructor(props){
		super(props);
        var request = this.props.navigation.state.params.request
        var type = this.props.navigation.state.params.type;
		this.state = {
			msg : '',
            request:request,
            type: type,
            receiver: (type == INCOMING)? request.requested_by : request.owner
		}
	}
	getInitialMessage(){
        var msg = ""
        if(this.state.type==INCOMING){
            msg = this.state.request.requested_by.fname + 
                ' is interested in ' + 
                this.state.request.product.name;
        }else{
            msg = 'Hi ' + this.state.request.owner.fname + ', ' +
                ' I am interested in ' + 
                this.state.request.product.name;
        }
         

        var amount = '$' + this.state.request.amount;

        return {
            'title' : msg,
            'amount' : amount
        }
    }
	sendMessage(){

		// For offline messages, store it in async storage
		const key = AsyncStorageKeys.CHAT;
		var chatData = {};

		chatData[ChatAttributes.MESSAGE] = this.state.msg;
		chatData[ChatAttributes.RECEIVER_ID] = this.state.receiver.user_uuid;// receiver user
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
    // Chat id : product_id + user_id
    var chat_id = this.state.request.product.prd_uuid + "," + this.state.receiver.user_uuid;
  	
    var i =0;
    var that = this;

    if( this.props.chat[chat_id]){
        while(i<this.props.chat[chat_id].length){ 
            var chat = this.props.chat[chat_id][i];

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
                            {/*<Text style={styles.chatTimeStyle}>{chat[ChatAttributes.LOADING] == undefined? 'sent': (chat[ChatAttributes.LOADING] == 1)? 'pending':'sent'}    </Text>*/}
                            <Moment element={Text} unix fromNow style={styles.chatStatusStyle}>{chat[ChatAttributes.TIMESTAMP]}</Moment>
                        </View>
                    </View> 
                </View>
            ) 
            i++;
        }
    }
    var initialMessage = this.getInitialMessage();
    return (

    	<View>
        	<View style={styles.chatHeader}>
        	
	            <TouchableOpacity onPress={() => this.goBack()}>
	                <Ionicon name='md-arrow-back' size={30} style={{height:30,width:30,color:'white'}}/>
	            </TouchableOpacity>
                <Text style={{color:theme.HEADER_TEXT_COLOR,fontSize:20}}>
                    { this.state.receiver.fname }
                </Text>
	            <TouchableOpacity onPress={() => this.updateProduct()}>
	                <Image 
                        style={{width: 50, height: 50}}
                        resizeMode="contain" 
                        source={{uri:this.state.request.product.thumbnail}}
                    />
	            </TouchableOpacity>
           	</View>
           	<ScrollView style={{
           		height:height - chatFooterHeight - chatFooterHeight - (Platform.OS === 'ios'?IOS_PADDING_TOP:ANDROID_PADDING_TOP),
           		elevation:-1,
           		backgroundColor:theme.CHAT_BACKGROUND_COLOR,
        		}}
        		ref={ref => this.scrollView = ref}
        		onContentSizeChange={(contentWidth, contentHeight)=>{        
			        	this.scrollView.scrollToEnd({animated: true});
				    }
				}>
       			{ chatDOM.length > 0 && chatDOM }
                { this.state.request.status == "pending"  && 
                    <View style={{padding:10, backgroundColor:theme.CHAT_BACKGROUND_COLOR}}>
                        <View style={{flexDirection:'column', flex:1, backgroundColor:theme.CHAT_BUBBLE_COLOR,padding:10}}>
                            <Text>{ initialMessage.title }</Text>
                            <Text style={{fontSize:12}}>{
                                'Requested for ' + 
                                this.state.request.duration + ' days ('+
                                this.state.request.start_date+' to '+
                                this.state.request.end_date + ')'
                            }</Text>
                            <Text>{initialMessage.amount}</Text>
                            <Moment element={Text} unix fromNow style={{fontSize:12}}>
                              {this.state.request.date}
                            </Moment>

                        </View>
                    </View>
                }
                
           	</ScrollView>
           	
           	<View style={styles.chatFooterStyle}>
                {   chatDOM.length == 0 && this.state.type == OUTGOING && 
                    this.state.request.status == "pending" &&
                    <Text>{'Waiting for response from ' + this.state.request.owner.fname }</Text>
                }
                { 
                    chatDOM.length == 0 && this.state.type== INCOMING && 
                    
                        <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
                            <TouchableOpacity>
                                <Text style={[styles.acceptRejectButton,{backgroundColor:theme.ACCEPT_COLOR}]}>Accept</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={[styles.acceptRejectButton,{backgroundColor:theme.REJECT_COLOR}]}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    

                }

                {
                    this.state.request.status == "approved" 
                    &&
                    (
                        <View>
                            <FormInput 
                                value={this.state.msg}
                                multiline
                                numberOfLines={4}
                                inputStyle={[styles.formInputStyle,{width:"100%"}]} 
                                containerStyle={[styles.formInputAboutContainerStyle,{width:width - sendButtonWidth}]}
                                onChangeText ={(msg) => this.setState({msg}) } />
                            <TouchableOpacity onPress={() => this.sendMessage()} style={{width:sendButtonWidth}}>
                                <Text style={{color:theme.GLOBAL_TEXT_COLOR,fontSize:20}}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }                
	            
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
    	color:theme.GLOBAL_TEXT_COLOR,
    	
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
        backgroundColor:theme.CHAT_BACKGROUND_COLOR,
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
    	backgroundColor:theme.CHAT_BACKGROUND_COLOR,
    	paddingTop:5,
    	paddingBottom:5,
    	paddingLeft:5,
    	paddingRight:5,
    	borderColor:theme.CHAT_BUBBLE_BORDER_COLOR,
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
    },
    acceptRejectButton:{
        color:'white',
        fontSize:16,
        padding:5,
        margin:2,
        width:100,
        textAlign:'center',
        borderRadius:5
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
