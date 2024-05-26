import * as React from 'react';
import { useState, useEffect, useContext } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInButton from './signInButton';
import SignOutButton from './singOutButton';
import LoadingIndicator from '../../components/loadingIndicator';
import { Context } from '../../components/globalContextProvider';


const globalStyles = require("../../globalStyles.json");

function ProfileHeader({ passedUser }) {

    const { user } = useContext(Context);
    const [displayUser, setDisplayUser] = useState(passedUser);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setDisplayUser(passedUser);
        setIsLoading(false);
    }, []);

    if(isLoading){
        return(
            <LoadingIndicator/>
        )
    }

    if(displayUser){
        return(
            <View style={styles.container}>
                <View style={styles.profileWrapper}>
                    <View style={styles.profileHeaderWrapper}>
                        <Image source={{ uri: displayUser.profilePicture }} style={styles.profilePicture}></Image>
                        <View style={styles.profileNameWrapper}>
                            <Text style={styles.nameText}>{displayUser.name}</Text>
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
                    {
                        displayUser.uid === user.uid? <SignOutButton/> : <></>
                    }
                </View>
            </View>
        );
    }
    else if(!user && !displayUser){
        return(
            <View style={styles.container}>
                <SignInButton/>
            </View>
        );
    }
    else if(!displayUser){
        return(
            <Text>User Does Not Exist</Text>
        );
    }
}

export default ProfileHeader;

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
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