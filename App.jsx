import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingIndicator from './components/loadingIndicator';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import FeedScreen from './screens/feedScreen/feedScreen';
import ProfileScreen from './screens/profileScreen/profileScreen';
import TrackerScreen from './screens/trackerScreen/trackerScreen';

// Context
import GlobalContextProvider, { Context } from './components/globalContextProvider';

const globalStyles = require('./globalStyles.json');
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavBar = ({ user }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Feed') {
          iconName = 'inbox';
        } else if (route.name === 'Tracker') {
          iconName = 'plus-circle';
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
        fontSize: 26,
      },
      tabBarAndroidRipple: true,
      headerTitle: (props) => <Text {...props} style={styles.header}>{route.name}</Text>,
    })}
  >
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Tracker" component={TrackerScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ passedUser: user }} />
  </Tab.Navigator>
);

const App = () => {
  const { user, isUserLoading } = React.useContext(Context);

  if (isUserLoading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={BottomNavBar} initialParams={{ user: user }} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function AppWrapper() {
  return (
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.backgroundColor,
  },
  header: {
    color: globalStyles.headerColor,
    fontSize: globalStyles.headerSize,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
