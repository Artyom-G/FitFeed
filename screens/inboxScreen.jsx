import * as React from 'react';
import { View, Text } from 'react-native';
import { SearchUsers } from '../components/searchUsers';

function InboxScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SearchUsers navigation={navigation}/>
      <Text>Inbox Screen</Text>
    </View>
  );
}

export default InboxScreen;