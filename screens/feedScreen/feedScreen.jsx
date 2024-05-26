import * as React from 'react';
import { View, Text } from 'react-native';
import { SearchUsers } from './searchUsers';

function FeedScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SearchUsers/>
      <Text>Inbox Screen</Text>
    </View>
  );
}

export default FeedScreen;