import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const clientIDs = require('../../private/clientIDs.json');
const globalStyles = require("../../globalStyles.json");

function SignOutButton() {

    GoogleSignin.configure({
        androidClientId: clientIDs.android,
        iosClientId: clientIDs.ios,
        webClientId: clientIDs.web
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