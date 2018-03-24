import React, { Component } from "react";
import { ScrollView, Text, AsyncStorage, View } from "react-native";
import { List, ListItem } from "react-native-elements";
import { messages } from "../../../config/data";
import { connect } from "react-redux";
import { loadMessageMetadata } from "../../../actions/ActionCreators";
import { CDN_URL, ChatAttributes } from "../../../config/commons";

class MessagesView extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props.constants);
    }

    componentDidMount() {
        // get ProductsAndUsersInfo
        this.props.loadMessageMetadata();
    }

    getUnreadMessageCount(chats) {
        var unreadMessageCount = 0;
        chats.map(chat => {
            unreadMessageCount += chat[ChatAttributes.VISITED] == 0 ? 1 : 0;
        });
        return unreadMessageCount;
    }

    getBadgeElement(count) {
        if (count > 0)
            return (
                <View>
                    <Text style={{ backgroundColor: "red", padding: 3 }}>
                        {count}
                    </Text>
                </View>
            );
        else return <View />;
    }
    render() {
        var that = this;
        console.log(that.props);
        return (
            <ScrollView>                
                <List containerStyle={{ marginTop: 0 }}>
                    {   
                        that.props.metadataList.map((metadata, i) => {
                        
                        var user_id = metadata.user_info.user_uuid;
                        var product_id = metadata.prod_info.product.prd_uuid;
                        var unreadMessageCount = that.getUnreadMessageCount(
                            that.props.chat[product_id]
                        );
                        var badge = that.getBadgeElement(unreadMessageCount);
                        return (
                            <ListItem
                                key={i}
                                title={
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            paddingLeft: 10
                                        }}
                                    >
                                        <Text>
                                            {metadata.prod_info.product.name}
                                        </Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {" - " + metadata.user_info.fname}
                                        </Text>
                                    </View>
                                }
                                subtitle={
                                    this.props.chat[product_id][
                                        this.props.chat[product_id].length - 1
                                    ][ChatAttributes.MESSAGE]
                                }
                                roundAvatar
                                avatar={{
                                    uri:
                                        CDN_URL +
                                        metadata.prod_info.thumbnail.photo_url
                                }}
                                /*leftIcon={{name:'account-circle'}}*/
                                badge={{ element: badge }}
                                rightIcon={{
                                    name: "chat-bubble",
                                    color:
                                        unreadMessageCount == 0
                                            ? "#a3a3a3"
                                            : "steelblue"
                                }}
                                onPress={
                                    // TODO: Create closure here
                                    () =>
                                        this.props.navigation.navigate(
                                            "ChatView",
                                            {
                                                user_id: product_id
                                            }
                                        )
                                }
                            />
                        );
                    })}
                </List>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return state.ChatReducer;
}
function mapDispatchToProps(dispatch) {
    return {
        loadMessageMetadata: () => dispatch(loadMessageMetadata())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MessagesView);
