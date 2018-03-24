import React, { Component } from 'react';
import { ScrollView, Text,StyleSheet, View, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { loggedInUserProfile } from '../../config/data'
import Icon from 'react-native-vector-icons/FontAwesome';
import { CDN_URL,months } from '../../config/commons';
import { theme } from '../../config/themes';
import { User } from '../../config/services';
import { connect } from 'react-redux';
import { getUserDetails } from '../../actions/ActionCreators';
import Images from '../../assets';
const iconSize = 25;
const listedTitle = "Listed";
const rentedTitle = "Rented";
const somethingTitle = "Something";
const profileImageHeight = 50;
const profileImageWidth = 50;

class LoggedInUserView extends Component {
    constructor(props){
        super(props);
        this.state = this.props
    }
    componentDidMount(){
        //this.getUserDetails();
        //Use the reverse Geo code to get address
        this.props.getUserDetails(this.props.constants.user_id);

    }
    

  render() {
    console.log(this.props);
    return (
      <ScrollView>
        <View style={{backgroundColor:theme.HEADER_BACKGROUND_COLOR,flex:1,flexDirection:'column',alignItems:'center'}}>
            <View style={{flex:1,height:150,alignItems:'center',justifyContent:'center'}}>
                <Image source={this.props.current_user.thumbnail} resizeMode="contain" style={{width:100,height:100,backgroundColor:'black',borderRadius:50}} />
            </View>
            <View style={styles.userMetricsLayout}>
                <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.userMetricsText}>{listedTitle}</Text>
                    <Text style={styles.userMetricsText}>{loggedInUserProfile.listed}</Text>
                </View>

                <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.userMetricsText}>{rentedTitle}</Text>
                    <Text style={styles.userMetricsText}>{loggedInUserProfile.rented}</Text>
                </View>

                <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.userMetricsText}>{somethingTitle}</Text>
                    <Text style={styles.userMetricsText}>{loggedInUserProfile.something}</Text>
                </View>
            </View>
        </View>
         <List style={styles.listStyle} containerStyle={{marginTop:0}}>
            <ListItem
                key={1}
                title={this.props.current_user.fname + ' ' + this.props.current_user.lname}
                subtitle='Full Name'
                leftIcon={{name:'account-circle'}}
              />

              <ListItem
                key={2}
                title={this.props.current_user.mobile}
                subtitle='Mobile'
                leftIcon={{name:'phone'}}
              />
               <ListItem
                key={3}
                title={this.props.current_user.email}
                subtitle='Email'
                leftIcon={{name:'email'}}
              />

               <ListItem
                key={4}
                title={this.props.current_user.location}
                subtitle='Location'
                leftIcon={{name:'location-on'}}
              />
               <ListItem
                key={5}
                title={this.props.current_user.membership}
                subtitle='Membership'
                leftIcon={{name:'access-time'}}
              />

        </List>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({

    userMetricsLayout:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        padding:5,
    },
    userMetricsText:{
        fontWeight: 'bold',
        color:'white'
    },
    listStyle:{
        marginTop:0
    }
});
function mapStateToProps(state){
    return {
        ...state.UserReducer,
        constants:state.ConstantsReducer   
    }
}
function mapDispatchToProps(dispatch){
    return{
        getUserDetails:(user_id) => dispatch(getUserDetails(user_id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoggedInUserView);
