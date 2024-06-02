import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";

export const PostItem = ({imageUri}) => {

    const onPress = () => {
        showToastWithGravity()
    };

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
          'Post URI: \n' + imageUri,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
    };

    return (  
        <TouchableOpacity style={styles.container} onPress={() => onPress()}>
            <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '48%', 
        marginBottom: 10
    },
    image:{
        width: '100%',
        height: 240,
        borderRadius: 5
    }
});