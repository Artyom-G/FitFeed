import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProfileHeader } from '../components/profileHeader';
//Screens
import HomeScreen from './homeScreen';
import InboxScreen from './inboxScreen';
import GoogleOAuth from '../components/googleOAuth';

const globalStyles = require('../globalStyles.json');
const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {
    return (
        <View>
            <GoogleOAuth></GoogleOAuth>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'HomeScreen') {
                            iconName = 'home';
                        } else if (route.name === 'InboxScreen') {
                            iconName = 'inbox';
                        } else if (route.name === 'ProfileScreen') {
                            iconName = 'user';
                        }
                        return <Icon name={iconName} size={globalStyles.bottomBarIconSize} color={focused ? globalStyles.activePrimaryColor : globalStyles.inactivePrimaryColor} />;
                    },
                    tabBarActiveTintColor: globalStyles.primaryRedColor,
                    tabBarInactiveTintColor: globalStyles.primaryRedColor,
                    tabBarStyle: {
                        backgroundColor: globalStyles.bottomBarBackgroundColor,
                    },
                    tabBarLabelStyle: {
                        display: 'none',
                    },
                    headerStyle: {
                        backgroundColor: globalStyles.primaryRedColor,
                        height: 100,
                    },
                    headerTitleStyle: {
                        color: 'white',
                    },
                    headerTitle: (props) => <Text {...props} style={styles.header}>FitFeed</Text>,
                })}
            >
                <Tab.Screen name="HomeScreen" component={HomeScreen} />
                <Tab.Screen name="InboxScreen" component={InboxScreen} />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.bottomBarBackgroundColor
    },
    header: {
        color: globalStyles.headerColor,
        fontSize: globalStyles.headerSize,
        fontWeight: 'bold',
        textAlign: 'right',
    }
});

export default ProfileScreen;