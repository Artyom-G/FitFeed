import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';

const globalStyles = require("../../globalStyles.json");

function SignInButton() {

    GoogleSignin.configure({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        webClientId: GOOGLE_WEB_CLIENT_ID,
    });

    async function signInGoogle() {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Sign in and get the idToken
            const userInfo = await GoogleSignin.signIn();
            const { idToken } = userInfo;

            if (!idToken) {
                throw new Error('No idToken returned from Google Sign-In');
            }

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign in with the credential
            await auth().signInWithCredential(googleCredential);

            console.log('Google Sign-In successful');
        } 
        catch (error) {
            console.error('Error during Google Sign-In:', error);
        }
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