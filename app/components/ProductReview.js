import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { theme } from '../config/themes';

import { Rating } from 'react-native-elements';

export default class ProductReview extends Component{
    render(){
        
        return(
          <View style={styles.productReviewWrapper}>
            <View style={styles.titleRatingContainer}>
              <Text style={{fontWeight:'bold'}}>{this.props.review.title}</Text>
              <Rating
                type="star"
                fractions={1}
                startingValue={2.6}
                readonly
                imageSize={15}
                onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 0 }}
              />
            </View>
            <Text>{this.props.review.description}</Text>
          </View>
                

        )
    }
}

var styles = StyleSheet.create({
  productReviewWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: theme.GLOBAL_BACKGROUND_COLOR,
    position: 'relative',
    paddingBottom:10
  },
  titleRatingContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingBottom:0,
    backgroundColor: theme.GLOBAL_BACKGROUND_COLOR,

  }
});