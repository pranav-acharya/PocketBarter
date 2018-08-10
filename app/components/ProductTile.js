import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    AsyncStorage
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { CDN_URL } from "../config/commons";
import { User } from "../config/services";
import { saveProduct, unSaveProduct } from "../actions/ActionCreators";
import { theme } from "../config/themes";

const iconSize = 30;
export default class ProductTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.product,
            pressed: false
        };
    }

    handlePress = props => {
        console.log(props);
        console.log(this.state);
        if (this.props.saved !== undefined && this.props.saved) {
            props.onUnSave(this.state);
        } else {
            props.onSave(this.state);
        }
    };
    
    render() {
        console.log(this.props.product);
        return (
            <TouchableOpacity
                onPress={() => {
                    if (!this.state.pressed) {
                        this.state.pressed = true;
                        this.props.onPress();
                        var that = this;
                        setTimeout(function() {
                            that.state.pressed = false;
                        }, 500);
                    }
                }}
                style={styles.container}
            >
                <Image
                    resizeMode="contain"
                    source={{
                        uri:
                            this.props.product.product.thumbnail == undefined
                                ? ""
                                : CDN_URL + this.props.product.product.thumbnail
                    }}
                    style={styles.thumbnail}
                />
                <Ionicon
                    name="ios-heart"
                    size={iconSize}
                    style={[
                        styles.iconStyle,
                        this.props.saved ? styles.saveStyle : styles.unsaveStyle
                    ]}
                    onPress={() => this.handlePress(this.props)}
                />
                <View style={{ width: "100%", padding: 5 }}>
                    <Text style={{ padding: 5, color:theme.GLOBAL_TEXT_COLOR }}>
                        {this.props.product.product !== undefined
                            ? this.props.product.product.name
                            : ""}
                    </Text>
                    <View style={styles.descriptionContainer}>
                        <Text style={{color:theme.GLOBAL_TEXT_COLOR}}>
                            {this.props.product.inventory !== undefined
                                ? ('$' + this.props.product.inventory.rates[0].amount)
                                : ""}
                        </Text>
                        <Text style={{color:theme.GLOBAL_TEXT_COLOR}}>
                            <Ionicon
                                name="ios-pin"
                                size={15}
                                style={{ height: 15, width: 15 }}
                            />{" "}
                            {this.props.product.product !== undefined
                                ? this.props.product.distance
                                : ""}{" "}
                            {"km"}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.GLOBAL_BACKGROUND_COLOR,
        position: "relative",
        borderWidth: 2,
        borderColor: theme.SEPARATOR_COLOR
    },
    thumbnail: {
        width: "100%",
        height: 130,
        backgroundColor: theme.DEFAULT_IMAGE_BACKGROUND_COLOR
    },
    descriptionContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderColor: "#f8f8f8"
    },
    iconStyle: {
        height: iconSize,
        width: iconSize,
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "transparent"
    },
    saveStyle: {
        color: theme.SAVE_COLOR
    },
    unsaveStyle: {
        color: theme.UNSAVE_COLOR
    }
});