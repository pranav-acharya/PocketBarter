import React, { Component } from 'react';
import { ScrollView, Text, View,Image, StyleSheet  } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getOutgoingProductRequests } from '../../../actions/ActionCreators';
import Moment from 'react-moment';

class OutgoingProductRequestsView extends Component {
    constructor(props){
      super(props);
    }

    componentDidMount(){
      this.props.getOutgoingProductRequests();
    }

    render() {
      return (
        <ScrollView>
          <List containerStyle={{marginTop:0}}>
          {
            this.props.outgoing.map((request,i) => (
              <ListItem
                key={i}
                title={request.owner.fname + ' ' + request.owner.lname}
                subtitle={
                  <View style={styles.subtitleView}>
                    <Text>{request.product.name}</Text>
                    <Text style={{fontSize:12}}>
                      {
                        'Requested for ' + 
                        request.duration + ' days ('+
                        request.start_date+' to '+
                        request.end_date + ')'
                      }
                    </Text>
                    <Moment element={Text} unix fromNow style={{fontSize:12}}>
                      {request.date}
                    </Moment>
                  </View>
                }
                leftIcon={{name:'fiber-manual-record', color:'#d3d3d3', size:10}}
                rightIcon={
                  <Image 
                    style={{width: 50, height: 50}}
                    resizeMode="contain" 
                    source={{uri:request.product.thumbnail}}
                  />
                }
                onPress = {() => this.props.navigation.navigate('ChatView',{"request":request,"type":"OUTGOING"})} 
              />
            ))
          }
          </List>
          </ScrollView>
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
    getOutgoingProductRequests: () => dispatch(getOutgoingProductRequests()),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(OutgoingProductRequestsView);