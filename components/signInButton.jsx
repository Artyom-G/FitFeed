import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const clientIDs = require('../private/clientIDs.json');
const globalStyles = require("../globalStyles.json");

function SignInButton() {

    GoogleSignin.configure({
        androidClientId: clientIDs.android,
        iosClientId: clientIDs.ios,
        webClientId: clientIDs.web
    });

    async function signInGoogle() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.singInButton} onPress={() => signInGoogle().then(() => console.log('Signed in with Google!'))}>
                <Text style={styles.signInButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SignInButton;

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