import { StyleSheet } from 'react-native';
export const CommonStyles = StyleSheet.create({
    backButtonStyle:{
        height:30,
        width:30,
        position:'absolute',
        top:15,
        left:20,
        color:'white',
        zIndex:10,
        backgroundColor:'transparent'
    },
    buttonStyle:{
        backgroundColor:'#1ea1d1'
    }

});

export const RequiredFieldMessage = 'This field is required';
export const CommonBlue = "#1ea1d1";
export const deepcopy = (obj) => {
  if (obj !== undefined && obj !== null) {
    return JSON.parse(JSON.stringify(obj));
  }

  return null;
}

export const AuthTypes = {
    GOOGLE: "google",
    SELF: "self"
};

// Make sure the token values aren't the same
export const AsyncStorageKeys = {
    CHAT: "chat",
    JWT: "jwt_token",
    USER_ID: "user_id",
    SAVED_PRODUCTS: "saved_products",
    AUTH: "auth",
    USER_PROFILE: "user_profile"

};

export const ChatAttributes = {
    VISITED : "v",
    MESSAGE: "m",
    TIMESTAMP: "t",
    SENDER_ID: "s",
    RECEIVER_ID: "r",
    LOADING: "l"
};

export const WEB_CLIENT_ID = "716532923321-7k8imsdisn9nfdsmsj02ngjbcslt4955.apps.googleusercontent.com"

export const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) =>  {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}
export const CDN_URL = "http://localhost:8090/v1/images/";
deg2rad = (deg) => {
  return deg * (Math.PI/180)
}

export const months = ["Jan","Feb","March","April","May","June","July","August","Sept","Oct","Nov","Dec"];

export const defaultLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
};
export const IOS_PADDING_TOP = 20;
export const ANDROID_PADDING_TOP = 24;

export const getImageExtensionFromValue = (value) => {
    result = (value == 1)? "jpg" : (value == 2)? "png" : "";
    return result;
}