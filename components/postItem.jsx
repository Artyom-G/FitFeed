import React from "react";
import { View, Image, StyleSheet } from "react-native";

export const PostItem = ({imageUri}) => {
    return (  
        <View style={styles.container}>
            <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
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