import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

const globalStyles = require('../globalStyles.json');

const Timer = () => {

    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const countRef = useRef(null); 

    useEffect(() => {
        async function dummyFunc(){
            await getTimerInfo();
        }
        dummyFunc();
    }, []);

    const getTimerInfo = async () => {
        const infoStr = await AsyncStorage.getItem("@fitfeedTimerStart");
        const info = JSON.parse(infoStr);
        if(info){
            const timeNow = new Date().getTime();
            await AsyncStorage.setItem("@fitfeedTimerEnd", JSON.stringify(timeNow));
            const timeThen = info;
            setTimer(Math.floor((timeNow - timeThen)/1000));
            setIsActive(true);
            handleStart();
        }
        else{
            const timeNow = new Date().getTime();
            await AsyncStorage.setItem("@fitfeedTimerStart", JSON.stringify(timeNow));
            await AsyncStorage.setItem("@fitfeedTimerEnd", JSON.stringify(timeNow));
            setTimer(0);
        }
    }

    const handleStart = () => {
        setIsActive(true);
        //await getTimerInfo();
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    const handleReset = async () => {
        clearInterval(countRef.current);
        setIsActive(false);
        const timeNow = new Date().getTime();
        await AsyncStorage.setItem("@fitfeedTimerStart", JSON.stringify(timeNow));
        await AsyncStorage.setItem("@fitfeedTimerEnd", JSON.stringify(timeNow));
        setTimer(0);
        showToastWithGravity();

    };

    const formatTime = (time) => {
        const date = new Date(null);
        date.setSeconds(time);
        const result = date.toISOString().slice(11, 19);
        return result;
    };

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
          'Workout Finished!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      };
    
    return(
        <View style={styles.container}>
            <Text>{formatTime(timer)}</Text>
            {
                !isActive ?
                    <TouchableOpacity onPress={() => handleStart()}>
                        <Icon name='play-circle' size={globalStyles.bottomBarIconSize} color={globalStyles.activePrimaryColor}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => handleReset()}>
                        <Icon name='stop-circle' size={globalStyles.bottomBarIconSize} color={globalStyles.activePrimaryColor}/>
                    </TouchableOpacity>
            }
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

export default Timer;