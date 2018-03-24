import React, { Component } from 'react';
import { ScrollView, Text, Image, View, StyleSheet } from 'react-native';
import { TabNavigator, NavigationActions } from 'react-navigation';
import { List, ListItem, Rating, Button } from 'react-native-elements';
import { userDetails } from '../../config/data'
import { theme } from '../../config/themes'
import { CommonStyles, CDN_URL } from '../../config/commons'
import Ionicon from 'react-native-vector-icons/Ionicons';
import ListedProducts from './ListedProducts';
import RentedProducts from './RentedProducts';
import Images from '../../assets';

const Tabs = TabNavigator({
  ListedProducts: {
    screen: ListedProducts,
  },
  RentedProducts: {
    screen: RentedProducts,
  },
});



class UserView extends Component {
    constructor(props){
        super(props);
        console.log("constructed UserView");
        console.log(this.props.navigation.state.params);
        var profileImageURI = this.props.navigation.state.params.userInfo.thumbnail;
        profileImageURI = profileImageURI==undefined? Images.default_user : { uri: CDN_URL + profileImageURI }
        this.state = {
            fname:this.props.navigation.state.params.userInfo.fname,
            lname:this.props.navigation.state.params.userInfo.lname,
            created_on:this.props.navigation.state.params.userInfo.created_on,
            profileImageURI:profileImageURI,
            location:''

        };
    }
    render() {
        return (
          <ScrollView style={styles.UserViewWrapper}>
            <View>
                <Ionicon 
                    name="ios-arrow-back" 
                    size={30} style={[CommonStyles.backButtonStyle,{backgroundColor:'transparent'}]}
                    onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                />
                <Image 
                    source={this.state.profileImageURI} 
                    style={styles.userDetailsStyle}
                    resizeMode='contain'
                />
            </View>
            <View>
                <Text></Text>
            </View>

            <View style={styles.basicUserInfoWrapper}>
                <View style={styles.basicUserInfo}>
                    <Text>{this.state.fname + ' ' + this.state.lname}</Text>
                    <Text>{this.state.location}</Text>
                </View>

                <View style={styles.userRatingContainer}>
                    <Text>{userDetails.reviewCount + ' Reviews'}</Text>
                    <Rating
                      type="star"
                      fractions={1}
                      startingValue={2.6}
                      readonly
                      imageSize={20}
                      onFinishRating={this.ratingCompleted}
                      style={ styles.ratingStyle}
                    />
                    
                </View>
            </View>

            <View style={styles.aboutUserWrapper}>
                <Text>{userDetails.about}</Text>
            </View>

            <View style={styles.aboutUserWrapper}>
                <Text style={styles.titleMetric}>Response Time</Text>
                <Text>{userDetails.responseTime + ' hours'}</Text>
            </View>

            <View style={styles.aboutUserWrapper}>
                <Text style={styles.titleMetric}>Verified Info</Text>
                {
                    userDetails.verifiedInformation.map((info,i) => (
                        <Text key={i}>{info}</Text>
                    ))
                }
                
            </View>

             <View style={styles.aboutUserWrapper}>
                <Text style={styles.titleMetric}>User Reviews</Text>
                <Text>{userDetails.userReviews + ' Reviews'}</Text>
            </View>

            <View style={styles.listedAndRentedWrapper}>
                <Tabs />
            </View>
            <Button 
                icon={{name:'chevron-right'}}
                title='Report this user' />

          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    listedAndRentedWrapper:{
        flex:1,
    },
    UserViewWrapper:{
        backgroundColor:theme.GLOBAL_BACKGROUND_COLOR
    },
    userDetailsStyle: {
        width:'100%',
        height:250,
        backgroundColor:'black'
    },
    basicUserInfoWrapper:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:theme.SEPARATOR_COLOR,
        borderBottomWidth:1,
        
    },
    basicUserInfo:{
        flex:1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        padding:10
    },
    ratingStyle:{
        backgroundColor:'transparent'
    },
    titleMetric:{
        fontWeight:'bold'
    },
    productOwnerStyle:{
        height:50,
        width:50
    },
    productNameWrapper:{
        padding:10,
    },
    aboutUserWrapper:{
        padding:10,
        borderBottomWidth:1,
        borderColor:theme.SEPARATOR_COLOR
    },
    userRatingContainer:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        padding:10
    }

});

export default UserView;