import * as React from 'react';
import { Button, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const clientIDs = require('../private/clientIDs.json');
const globalStyles = require("../globalStyles.json");


WebBrowser.maybeCompleteAuthSession();

function ProfileFirebaseHeader() {
    
    const [userInfo, setUserInfo] = React.useState(null);
    const [signedIn, setSignedIn] = React.useState(false);
    GoogleSignin.configure({
        androidClientId: clientIDs.android,
        iosClientId: clientIDs.ios,
        webClientId: clientIDs.web
    });

    const Auth = getAuth();
    onAuthStateChanged(Auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            setUserInfo(user)
            setSignedIn(true)
            console.log("Signed in as " + user.displayName)
        } else {
            // User is signed out
            setSignedIn(false)
            setUserInfo(null)
            console.log("signed out!")
        }
    });
    

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    }

    async function signOut() {
        auth().signOut().then(() => console.log('User signed out!'))
        await GoogleSignin.signOut();
    }

    return (
        signedIn ?
            <View style={styles.container}>
                <View style={styles.bioProfileWrapper}>
                    <View style={styles.profile}>
                        <Image source={{ uri: userInfo.photoURL }} style={styles.image}></Image>
                        <View style={styles.profileText}>
                            <Text style={styles.text}>{userInfo.displayName}</Text>
                            <Text>Elite Powerlifter</Text>
                            <View style={styles.profileMedals}>
                                <Icon name={'star'} size={globalStyles.profileMedalIconSize} color={globalStyles.activePrimaryColor} />
                                <Icon name={'star'} size={globalStyles.profileMedalIconSize} color={globalStyles.activePrimaryColor} />
                                <Icon name={'star'} size={globalStyles.profileMedalIconSize} color={globalStyles.activePrimaryColor} />
                                <Text>+5 more..</Text>
                            </View>
                        </View>
                    </View>
                    <Text>This Bio is very long lol</Text>
                    <Text>Bogus Bogus Bogus</Text>
                    <Text>Bingus Bingus Bingus</Text>
                    <Text>Pump Homie is Elite</Text>
                    <TouchableOpacity style={styles.singInButton} onPress={() => signOut()}>
                        <Text style={styles.buttonText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            :
            <View style={styles.container}>
                <TouchableOpacity style={styles.singInButton} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
                    <Text style={styles.buttonText}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
    );
}

export default ProfileFirebaseHeader;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        width: '100%',
        paddingBottom: 40
    },
    bioProfileWrapper:{
        width: '90%',
        justifyContent: 'left',
        flexDirection: 'column',
        gap: 10
    },
    profile:{
        display: 'flex',
        flexDirection: 'row',
        gap: 40
    },
    profileText:{
        flexDirection: 'column',
        gap: 10
    },
    profileMedals:{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    },

    infoWrapper: {

    },
    image: {
        width: globalStyles.profileLogoSize,
        height: globalStyles.profileLogoSize,
        borderRadius: 100
    },
    text: {
        color: globalStyles.activePrimaryColor,
        fontWeight: 'bold',
        fontSize: 22,
    },
    singInButton: {
        backgroundColor: globalStyles.activePrimaryColor,
        padding: 10,            
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',        
        fontWeight: 'bold',
        textAlign: 'right'    
    }
});