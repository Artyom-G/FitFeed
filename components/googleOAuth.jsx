import * as React from 'react';
import { Button, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";

const clientIDs = require('../clientIDs.json');
const globalStyles = require("../globalStyles.json");

WebBrowser.maybeCompleteAuthSession();

function GoogleOAuth() {
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
                <Image source={{ uri: userInfo.picture }} style={styles.image}></Image>
                <Text style={styles.text}>{userInfo.email}</Text>
                <TouchableOpacity style={styles.redButton} onPress={() => DeleteUserData()}>
                    <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
            </View>
            :
            <View style={styles.container}>
                <TouchableOpacity style={styles.redButton} onPress={() => promptAsync()}>
                    <Text style={styles.buttonText}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
    );
}

export default GoogleOAuth;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    infoWrapper: {

    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    text: {
        color: globalStyles.activePrimaryColor,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    redButton: {
        backgroundColor: globalStyles.activePrimaryColor,
        padding: 10,            
        borderRadius: 5
    },
    buttonText: {
        color: 'white',        
        fontWeight: 'bold'      
    }
});