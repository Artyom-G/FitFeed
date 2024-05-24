import * as React from 'react';
import { useContext } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Context } from '../App';
import SignInButton from './signInButton';
import SignOutButton from './singOutButton';

const clientIDs = require('../private/clientIDs.json');
const globalStyles = require("../globalStyles.json");

function ProfileHeader() {

    const [user, setUser, userSignedIn, setUserSignedIn, signIn, signOut] = useContext(Context);

    return (
        userSignedIn ?
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
                    <SignOutButton/>
                </View>
            </View>
            :
            <View style={styles.container}>
                <SignInButton/>
            </View>
    );
}

export default ProfileHeader;

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