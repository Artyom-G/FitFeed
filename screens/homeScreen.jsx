import * as React from 'react';
import { Button, View, Text } from 'react-native';
import Timer from '../components/timer';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home page</Text>
    </View>
  );
}

export default HomeScreen;