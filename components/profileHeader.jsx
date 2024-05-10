import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GoogleOAuth from '../components/googleOAuth';

const globalStyles = require('../globalStyles.json');

export const ProfileHeader = () => {
    const signedIn = true;

    return (
        signedIn ?
            <View style={styles.container}>
                <Image source={{ uri: userInfo.picture }} style={styles.image}></Image>
                <Text style={styles.text}>{userInfo.email}</Text>
                <GoogleOAuth></GoogleOAuth>
            </View>
            :
            <View style={styles.container}>
                <GoogleOAuth></GoogleOAuth>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    infoWrapper: {

    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    text: {
        color: globalStyles.activePrimaryColor,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    redButton: {
        backgroundColor: globalStyles.activePrimaryColor,
        padding: 10,            
        borderRadius: 5
    },
    buttonText: {
        color: 'white',        
        fontWeight: 'bold'      
    }
});