import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get the full width and height of the screen
const { width, height } = Dimensions.get('window');

const Timer = () => {

    const [timerCurrent, setTimerCurrent] = useState(0);

    const getTimerInfo = async () => {
        const info = await AsyncStorage.getItem("@timerStart");
        if(info){
            const timeNow = new Date().getTime();
            await AsyncStorage.setItem("@timerEnd", timeNow);
            const timeThen = await AsyncStorage.getItem("@timerStart");
            setTimerCurrent(timeNow - timeThen);
        }
        else{
            await resetTimerInfo();
        }
    }

    const resetTimerInfo = async () => {
        const timeNow = new Date().getTime();
        await AsyncStorage.setItem("@timerStart", timeNow);
        await AsyncStorage.setItem("@timerEnd", timeNow);
        setTimerCurrent(0);
    }

    useEffect(() => {
        console.log(timerCurrent);
    }, [timerCurrent]);

    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef(null); // reference to the interval ID

    // function to handle the start button press
    const handleStart = async () => {
        setIsActive(true);
        setIsPaused(false);
        await getTimerInfo();
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    // function to handle the pause button press
    const handlePause = async () => {
        clearInterval(countRef.current);
        setIsPaused(true);
        await getTimerInfo();
    };

    // function to handle the continue button press
    const handleContinue = async () => {
        setIsPaused(false);
        await getTimerInfo();
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    // function to handle the reset button press
    const handleReset = async () => {
        clearInterval(countRef.current);
        setIsActive(false);
        setIsPaused(false);
        setTimer(0);
        await resetTimerInfo();
    };

    // calculate the time values for display
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <Text>Stopwatch</Text>
            <View style={styles.timerContainer}>
                <Text style={styles.timer}>{formatTime(timer)}</Text>
            </View>
            <View style={styles.buttonContainer}>
                {!isActive && !isPaused ? (
                    <TouchableOpacity style={styles.playbutton} onPress={() => handleStart()}>
                        <Icon name="play" size={30} color="#fff" />
                    </TouchableOpacity >
                ) : (
                    <>
                        <TouchableOpacity style={styles.pausebutton} onPress={() => handlePause()}>
                            <Icon name="pause" size={30} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleReset()}>
                            <Icon name="refresh" size={30} color="#fff" />
                            <Text style={styles.buttonText}>Reset</Text>
                        </TouchableOpacity>
                        {isPaused && (
                            <TouchableOpacity style={styles.button} onPress={() => handleContinue()}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    timerContainer: {
        borderWidth: 4,
        backgroundColor: 'white',
        borderColor: '#D1A3DE',
        width: 300, // Set width to the screen width
        height: 100, // Set height to the screen height
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        fontSize: 20,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute', // Position the container absolutely
        right: 0, // Align the container to the right edge of the screen
        top: height / 2 - 40, // Subtract half the height of the button to center it vertically
        alignItems: 'center', // This will align the button text vertically
        marginTop: 30,

    },
    playbutton: {
        width: 60,
        height: 60,
        borderRadius: 1000 / 2,
        backgroundColor: '#57EA93',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 50,
        top: -55,
        marginVertical: -100,
    },

    pausebutton: {
        width: 60,
        height: 60,
        borderRadius: 1000 / 2,
        backgroundColor: 'F64040',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 50,
        top: -55,
        marginVertical: -100,
    },


    button: {
        width: 60,
        height: 60,
        borderRadius: 1000 / 2,
        backgroundColor: '#57EA93',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 50,
        top: -55,
        marginVertical: -100,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});

export default Timer;