import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/homeScreen';
import InboxScreen from './screens/inboxScreen';
import ProfileScreen from './screens/profileScreen';
import TrackerScreen from './screens/trackerScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text } from 'react-native';

const globalStyles = require('./globalStyles.json');
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Tracker') {
              iconName = 'home';
            } else if (route.name === 'Inbox') {
              iconName = 'inbox';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            }
            return <Icon name={iconName} size={globalStyles.bottomBarIconSize} color={focused ? globalStyles.activePrimaryColor : globalStyles.inactivePrimaryColor} />;
          },
          tabBarActiveTintColor: globalStyles.activePrimaryColor,
          tabBarInactiveTintColor: globalStyles.inactivePrimaryColor,
          tabBarStyle: {
            backgroundColor: globalStyles.backgroundColor,
            position: 'absolute',
            bottom: 20,
            left: 70,
            right: 70,
            elevation: 0,
            borderRadius: 40,
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            display: 'none',
          },
          headerStyle: {
            backgroundColor: 'white',
            height: 60,
          },
          headerTitleStyle: {
            color: 'white', 
            fontSize: 26
          },
          tabBarAndroidRipple: true,
          headerTitle: (props) => <Text {...props} style={styles.header}>{route.name}</Text>, 
        })}
      >

        <Tab.Screen name="Tracker" component={TrackerScreen} />
        <Tab.Screen name="Inbox" component={InboxScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: globalStyles.backgroundColor
  },
  header:{
    color: globalStyles.headerColor,
    fontSize: globalStyles.headerSize,
    fontWeight: 'bold',
    textAlign: 'right',
  }
});