import * as React from 'react';
import { Button, View, Text } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";

const clientIDs = require('../clientIDs.json');

WebBrowser.maybeCompleteAuthSession();

function GoogleOAuth({ navigation }) {
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: clientIDs.android,
        iosClientId: clientIDs.ios,
        webClientId: clientIDs.web
    });

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
        } catch (error) {
            console.log("error!");
            console.log(error);
        }
    }

    const DeleteUserData = () => {
        AsyncStorage.removeItem("@user");
        setUserInfo(null);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Sign in with Google" onPress={() => promptAsync()} />
            <Button title="Log out" onPress={() => DeleteUserData()} />
            <Text>{JSON.stringify(userInfo, null, 2)}</Text>
        </View>
    );
}

export default GoogleOAuth;