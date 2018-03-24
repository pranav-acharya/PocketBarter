import React, { Component } from 'react';
import { ScrollView, Text, View,Image, StyleSheet  } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { alerts } from '../../../config/data'
import { connect } from 'react-redux';

class AlertsView extends Component {
    constructor(props){
      super(props);
      console.log(this.props.navigation);
      this.state = {
        user_id:this.props.constants.user_id
      }

    }
    render() {
      return (
        <ScrollView>
          <List containerStyle={{marginTop:0}}>
          {
            alerts.map((alert,i) => (
              <ListItem
                key={i}
                title={alert.title}
                subtitle={
                  <View style={styles.subtitleView}>
                    <Text>{alert.priceRange.start + ' - ' + alert.priceRange.end}</Text>
                    <Text style={{fontSize:12}}>{alert.time}</Text>
                  </View>
                }
                leftIcon={{name:'fiber-manual-record', color:alert.visited?'green':'#d3d3d3', size:10}}
                rightIcon={
                  <Image 
                    style={{width: 50, height: 50}}
                    resizeMode="contain" 
                    source={{uri:alert.uri}}

                  />
                }
                onPress = {() => this.props.navigation.navigate('ChatView')} 
              />
            ))
          }
          </List>
          </ScrollView>
      );
    }
}

var styles = StyleSheet.create({
  subtitleView: {
    flexDirection:'column',
  },
});

function mapStateToProps(state){
  return {
    constants: state.ConstantsReducer,
  }
}
function mapDispatchToProps(dispatch){
  return{

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AlertsView);



