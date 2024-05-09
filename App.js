import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/homeScreen';
import InboxScreen from './screens/inboxScreen';
import ProfileScreen from './screens/profileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

const globalStyles = require('./globalStyles.json');
const Tab = createBottomTabNavigator();

export default function App() {

  const [fontLoaded, setFontLoaded] = React.useState(false)

  React.useEffect(() => {
    Font.loadAsync({
      "Itim": require("./assets/Itim.ttf"),
    })
    .then(() => {
     setFontLoaded(true)
    }) 
  }, [])

  if (!fontLoaded) return null

  return (
    <NavigationContainer>
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
          tabBarActiveTintColor: globalStyles.activePrimaryColor,
          tabBarInactiveTintColor: globalStyles.inactivePrimaryColor,
          tabBarStyle: {
            backgroundColor: globalStyles.backgroundColor,
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 40,
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        })}
      >

        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="InboxScreen" component={InboxScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

