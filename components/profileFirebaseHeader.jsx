import * as React from 'react';
import { useEffect, useState, useContext } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import database from '@react-native-firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from '../App';

const clientIDs = require('../private/clientIDs.json');
const globalStyles = require("../globalStyles.json");

function ProfileFirebaseHeader() {
    
    const [signedIn, setSignedIn] = useContext(Context);
    const [user, setUser] = useContext(Context);

    GoogleSignin.configure({
        androidClientId: clientIDs.android,
        iosClientId: clientIDs.ios,
        webClientId: clientIDs.web
    });

    //OnAuthStateChanged
    useEffect(() => {
        const Auth = getAuth();
        const unsubscribe = onAuthStateChanged(Auth, (_user) => {
            if (_user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.userinfo
                setUser(_user);
                setSignedIn(true);
                //setUserLocally();
                writeToDatabase(_user);
                console.log("Signed in as " + _user.displayName);
            } else {
                // User is signed out
                setSignedIn(false);
                setUser(null);
                deleteUserLocally();
                console.log("signed out!");
            }
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);
    

    async function signInGoogle() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    }

    async function signOutGoogle() {
        auth().signOut().then(() => console.log('User signed out!'))
        await GoogleSignin.signOut();
    }

    const writeToDatabase = async ({ uid, displayName, email, phoneNumber, photoURL }) => {
        try{
            //await AsyncStorage.setItem("@fitfeedUserID", JSON.stringify(uid));
            await database().ref(`/users/${uid}`).set({
                name: displayName,
                email: email,
                phoneNumber: phoneNumber,
                profilePicture: photoURL
            });
            console.log('success');
        }
        catch(error){
            console.log('error: ', error);
        }
    }

    async function setUserLocally() {
        await AsyncStorage.setItem("@fitfeedUserID", JSON.stringify(user.uid));
    }

    const deleteUserLocally = () => {
        //AsyncStorage.removeItem("@fitfeedUserID");
        setUser(null);
        setSignedIn(false);
    }

    return (
        signedIn ?
            <View style={styles.container}>
                <View style={styles.profileWrapper}>
                    <View style={styles.profileHeaderWrapper}>
                        <Image source={{ uri: user.photoURL }} style={styles.profilePicture}></Image>
                        <View style={styles.profileNameWrapper}>
                            <Text style={styles.nameText}>{user.displayName}</Text>
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
                    <TouchableOpacity style={styles.singInButton} onPress={() => signOutGoogle()}>
                        <Text style={styles.signInButtonText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            :
            <View style={styles.container}>
                <TouchableOpacity style={styles.singInButton} onPress={() => signInGoogle().then(() => console.log('Signed in with Google!'))}>
                    <Text style={styles.signInButtonText}>Sign in with Google</Text>
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
    profileWrapper:{
        width: '90%',
        justifyContent: 'left',
        flexDirection: 'column',
        gap: 10
    },
    profileHeaderWrapper:{
        display: 'flex',
        flexDirection: 'row',
        gap: 40
    },
    profileNameWrapper:{
        flexDirection: 'column',
        gap: 10
    },
    profileMedals:{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    },
    profilePicture: {
        width: globalStyles.profileLogoSize,
        height: globalStyles.profileLogoSize,
        borderRadius: 100
    },
    nameText: {
        color: globalStyles.activePrimaryColor,
        fontWeight: 'bold',
        fontSize: 22,
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