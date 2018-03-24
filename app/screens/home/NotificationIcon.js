import React from "react";
import { Text, Image, View } from "react-native";
import { connect } from "react-redux";
import Ionicon from "react-native-vector-icons/Ionicons";
import { ChatAttributes } from "../../config/commons";

class NotificationIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  getUnreadMessagesCount(chatObj) {
    var res = Object.values(chatObj).reduce((accumulator, chatArray) => {
      var value = chatArray.reduce((acc, chat) => {
        return acc + (chat[ChatAttributes.VISITED] === 0 ? 1 : 0);
      }, 0);

      return accumulator + value;
    }, 0);

    return res;
  }

  render() {
    var notificationCount = this.getUnreadMessagesCount(this.props.chat);
    return (
      <View
        style={{
          zIndex: 12,
          flex: 1,
          alignSelf: "stretch",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <Ionicon
          name="ios-notifications-outline"
          color={this.props.color}
          size={this.props.size}
          style={{ width: this.props.size, height: this.props.size }}
        />
        {notificationCount > 0 ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              borderRadius: 50,
              backgroundColor: "red",
              padding: 3
            }}
          >
            <Text style={{ color: "#FFF" }}>{notificationCount}</Text>
          </View>
        ) : (
          undefined
        )}
      </View>
    );
  }
}

var mapStateToProps = state => {
  return state.ChatReducer;
};
export default connect(mapStateToProps, null)(NotificationIcon);