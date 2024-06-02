import * as React from 'react';
import { useState, useEffect, useContext } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInButton from './signInButton';
import LoadingIndicator from '../../components/loadingIndicator';
import { Context } from '../../components/globalContextProvider';
import SettingsButton from './settingsButton';

const globalStyles = require("../../globalStyles.json");

function ProfileHeader({ passedUser }) {

    const { user } = useContext(Context);
    const [displayUser, setDisplayUser] = useState(passedUser);

    useEffect(() => {
        setDisplayUser(passedUser);
    }, [passedUser]);
    
    if (!displayUser) {
    return <LoadingIndicator />;
    }

    if(displayUser){
        if(displayUser.profile){
            return(
                <View style={styles.container}>
                    <View style={styles.profileWrapper}>
                        <View style={styles.profileHeaderWrapper}>
                            <Image source={{ uri: displayUser.profile.profilePicture }} style={styles.profilePicture}></Image>
                            <View style={styles.profileNameWrapper}>
                                <View style={styles.profileNameSettingsWrapper}>
                                    <Text style={styles.nameText}>{displayUser.profile.name}</Text>
                                    {
                                        displayUser.uid === user.uid? <SettingsButton/> : <></>
                                    }
                                </View>
                                <Text>{displayUser.profile.title}</Text>
                                <View style={styles.profileMedals}>
                                    <Icon name={'star'} size={globalStyles.profileMedalIconSize} color={globalStyles.activePrimaryColor} />
                                    <Icon name={'star'} size={globalStyles.profileMedalIconSize} color={globalStyles.activePrimaryColor} />
                                    <Icon name={'star'} size={globalStyles.profileMedalIconSize} color={globalStyles.activePrimaryColor} />
                                    <Text>+5 more..</Text>
                                </View>
                            </View>
                        </View>
                        <Text>{displayUser.profile.bio}</Text>
                    </View>
                </View>
            );
        }
        else{
            return(
                <View style={styles.container}>
                    <View style={styles.profileWrapper}>
                        <View style={styles.profileHeaderWrapper}>
                            <Image source={{ uri: displayUser.profilePicture }} style={styles.profilePicture}></Image>
                            <View style={styles.profileNameWrapper}>
                                <View style={styles.profileNameSettingsWrapper}>
                                    <Text style={styles.nameText}>{displayUser.name}</Text>
                                    {
                                        displayUser.uid === user.uid? <SettingsButton/> : <></>
                                    }
                                </View>
                                <Text>Elite Powerlifter</Text>
                                <View style={styles.profileMedals}>
                                    <Text>No medals yet</Text>
                                </View>
                            </View>
                        </View>
                        <Text>This Bio is very long lol</Text>
                        <Text>Bogus Bogus Bogus</Text>
                    </View>
                </View>
            );
        }
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
    profileNameSettingsWrapper:{
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        fontSize: 22
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