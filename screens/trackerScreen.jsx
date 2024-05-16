import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Timer from '../components/timer';
import ExerciseList from '../components/exerciseList';
import FirebaseTest from '../components/firebaseTest';
import TakePictureButton from '../components/takePictureButton';

const globalStyles = require('../globalStyles.json');

const TrackerScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Tracker</Text>
            <ExerciseList/>
            <FirebaseTest/>
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