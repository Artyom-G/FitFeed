import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Button } from 'react-native';
import database from '@react-native-firebase/database';

const globalStyles = require('../globalStyles.json');

const FirebaseTest = () => {

    const writeToDatabase = async () => {
        try{
            await database().ref('/users/123').set({
                name: 'user name',
                age: 31,
            });
            console.log('success');
        }
        catch(error){
            console.log('error: ', error);
        }
    }

    return (  
        <View>
            <Button title="write to database" onPress={writeToDatabase} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '90%',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    }

});

export default FirebaseTest;
