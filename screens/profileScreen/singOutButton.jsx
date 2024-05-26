import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';

const globalStyles = require("../../globalStyles.json");

function SignOutButton() {

    GoogleSignin.configure({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        webClientId: GOOGLE_WEB_CLIENT_ID,
    });

    async function signOutGoogle() {
        auth().signOut().then()
        await GoogleSignin.signOut();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.singInButton} onPress={() => signOutGoogle()}>
                <Text style={styles.signInButtonText}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SignOutButton;

const styles = StyleSheet.create({
    container: {

    },
    singInButton: {
        backgroundColor: globalStyles.activePrimaryColor,
        padding: 10,            
        borderRadius: 5,
    },
    signInButtonText: {
        color: 'white',        
        fontWeight: 'bold',
        textAlign: 'right'    
    }
});