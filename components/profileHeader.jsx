import * as React from 'react';
import { Button, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';

const clientIDs = require('../clientIDs.json');
const globalStyles = require("../globalStyles.json");

WebBrowser.maybeCompleteAuthSession();

function ProfileHeader() {
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: clientIDs.android,
        iosClientId: clientIDs.ios,
        webClientId: clientIDs.web
    });
    const [signedIn, setSignedIn] = React.useState(false);

    React.useEffect(() => {
        handleSignInWithGoogle();
    }, [response]);

    async function handleSignInWithGoogle() {
        //console.log("t3");
        const user = await AsyncStorage.getItem("@user");
        if (!user) {
            ///console.log("test2");
            if (response?.type === "success") {
                await getUserInfo(response.authentication.accessToken);
                console.log("Success!!");
            }
            //await getUserInfo();
        } else {
            setUserInfo(JSON.parse(user));
            setSignedIn(true);
            //console.log("test1");
            //console.log(JSON.stringify(userInfo));
        }
    }

    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            //console.log(response);
            const user = await response.json();
            //console.log(user);
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
            setSignedIn(true);
        } catch (error) {
            console.log("error!");
            console.log(error);
        }
    }

    const DeleteUserData = () => {
        AsyncStorage.removeItem("@user");
        setUserInfo(null);
        setSignedIn(false);
    }

    return (
        signedIn ?
            <View style={styles.container}>
                <View style={styles.bioProfileWrapper}>
                    <View style={styles.profile}>
                        <Image source={{ uri: userInfo.picture }} style={styles.image}></Image>
                        <View style={styles.profileText}>
                            <Text style={styles.text}>{userInfo.name}</Text>
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
                    <TouchableOpacity style={styles.singInButton} onPress={() => DeleteUserData()}>
                        <Text style={styles.buttonText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            :
            <View style={styles.container}>
                <TouchableOpacity style={styles.singInButton} onPress={() => promptAsync()}>
                    <Text style={styles.buttonText}>Sign in with Google</Text>
                </TouchableOpacity>
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