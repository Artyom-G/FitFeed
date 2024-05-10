import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const globalStyles = require('../globalStyles.json');

const TrackerScreen = () => {
    return (
        <View>
            <Text>Tracker</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.bottomBarBackgroundColor
    },

});

export default TrackerScreen;