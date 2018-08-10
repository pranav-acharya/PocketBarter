import React, { Component } from 'react';
import { Text, View, StyleSheet  } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'react-moment';
class OutgoingProductRequestsBadge extends Component {
    constructor(props){
      super(props);
    }
    
    render() {
      var notificationCount = this.props.outgoing.length;
      return (
        <View>
          <Text style={{color:this.props.color}}>{'Outgoing (' + notificationCount + ')'}</Text>
        </View>
      );
    }
}

var styles = StyleSheet.create({
  
});

function mapStateToProps(state){
  return {
    outgoing: state.ProductRequestsReducer.outgoing,
  }
}
function mapDispatchToProps(dispatch){
  return{

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(OutgoingProductRequestsBadge);