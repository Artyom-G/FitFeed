import * as React from 'react';
import { useContext } from 'react';
import { Context } from '../App';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileHeader from '../components/profileHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

//Screens
import { PostsTab } from './postsTab';
import { StatsTab } from './statsTab';
import SignInButton from '../components/signInButton';

const globalStyles = require('../globalStyles.json');
const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {
    const route = useRoute();
    const { _user } = route.params || {};

    const [user, setUser, userSignedIn, setUserSignedIn, signIn, signOut] = useContext(Context);

    if(!user && !_user){
        return(
            <View>
                <Text>Please Sign In to View Your Profile</Text>
                <SignInButton></SignInButton>
            </View>
        )
    }

    const displayUser = user || contextUser;

    return (
        <SafeAreaView style={styles.container}>
            <ProfileHeader userProfile={displayUser}/>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'PostsTab') {
                            iconName = 'th-large';
                        } else if (route.name === 'StatsTab') {
                            iconName = 'server';
                        }
                        return <Icon name={iconName} size={globalStyles.bottomBarIconSize} color={focused ? globalStyles.activePrimaryColor : globalStyles.inactivePrimaryColor} />;
                    },
                    tabBarActiveTintColor: globalStyles.activePrimaryColor,
                    tabBarInactiveTintColor: globalStyles.inactivePrimaryColor,
                    tabBarStyle: {
                        backgroundColor: globalStyles.backgroundColor,
                    },
                    tabBarLabelStyle: {
                        display: 'none',
                    },
                    tabBarAndroidRipple: true,
                    tabBarPressColor: globalStyles.activePrimaryColor,
                    tabBarPressColor: globalStyles.activePrimaryColor,
                    tabBarIndicatorStyle: {
                        backgroundColor: globalStyles.activePrimaryColor,
                    },
                })}
            >
                <Tab.Screen name="PostsTab" component={PostsTab} initialParams={{userId: displayUser.uid}}/>
                <Tab.Screen name="StatsTab" component={StatsTab} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        color: globalStyles.headerColor,
        fontSize: globalStyles.headerSize,
        fontWeight: 'bold',
        textAlign: 'right',
    }
});

export default ProfileScreen;