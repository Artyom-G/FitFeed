import * as React from 'react';
import { Button, View, Text } from 'react-native';
import GoogleOAuth from '../components/googleOAuth';

function ProfileScreen({ navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <GoogleOAuth />
        </View>
    );
}

export default ProfileScreen;