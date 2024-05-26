import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timer from './timer';
import ExerciseList from './exerciseList';
import TakePictureButton from './takePictureButton';

const globalStyles = require('../../globalStyles.json');

const TrackerScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Tracker</Text>
            <ExerciseList/>
            <TakePictureButton />
            <Timer/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
});

export default TrackerScreen;