import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert  } from 'react-native';
import { connect } from 'react-redux';

class IncomingProductRequestsBadge extends Component {
    constructor(props){
      super(props);
    }
    
    render() {
      var notificationCount = this.props.incoming.length;

      return (
        <View>
          <Text style={{color:this.props.color}}>{'Incoming (' + notificationCount + ')'}</Text>
        </View>
      );
    }
}

var styles = StyleSheet.create({
  
});

function mapStateToProps(state){
  return {
    incoming: state.ProductRequestsReducer.incoming,
  }
}
function mapDispatchToProps(dispatch){
  return{

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(IncomingProductRequestsBadge);