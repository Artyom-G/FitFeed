import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const globalStyles = require("../../globalStyles.json");

const SettingsButton = () => {

    const navigation = useNavigation();

    const onPress = () => {
        console.log("settings");
        navigation.navigate('Settings');
    }

    return (
        <TouchableOpacity onPress={() => onPress()}>
            <Icon name={'gear'} size={globalStyles.bottomBarIconSize} color={globalStyles.activePrimaryColor} />
        </TouchableOpacity>
    )
}

export default SettingsButton

const styles = StyleSheet.create({})