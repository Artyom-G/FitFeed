import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExerciseItem from './exerciseItem';

const globalStyles = require('../globalStyles.json');

const ExerciseList = () => {

    const [exercise, setExercise] = useState("");
    const [exerciseItems, setExerciseItems] = useState([]);
    const [activeExerciseItems, setActiveExerciseItems] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);

    const createCourse = () => {
        if(exercise != ""){
            //Keyboard.dismiss();
            const _course = {name: exercise, color:randomColor()}
            setExerciseItems([...exerciseItems, _course])
            setExercise("");
        }
    }

    function randomColor(){
        return globalStyles.exerciseColors[Math.floor(Math.random() * globalStyles.exerciseColors.length)];
    }

    function changeCourse(newName, index){
        console.log("exercise name triggered");
        var exerciseItemsRetrieved = [...exerciseItems]
        exerciseItemsRetrieved[index].name = newName;
        setExerciseItems(exerciseItemsRetrieved)
    }

    function changeColor(index){
        console.log("color triggered");
        var exerciseItemsRetrieved = [...exerciseItems]
        exerciseItemsRetrieved[index].color = randomColor();
        setExerciseItems(exerciseItemsRetrieved)
    }

    function deleteCourse(index){
        console.log("delete triggered");
        var exerciseItemsRetrieved = [...exerciseItems]
        exerciseItemsRetrieved.splice(index, 1)
        setExerciseItems(exerciseItemsRetrieved);
    }

    function addToActiveList(item){
        console.log("add to active list triggered");
        setActiveExerciseItems([...activeExerciseItems, item])
    }

    function removeFromActiveList(index){
        console.log("delete triggered");
        var activeExerciseItemsRetrieved = [...activeExerciseItems]
        activeExerciseItemsRetrieved.splice(index, 1)
        setActiveExerciseItems(activeExerciseItemsRetrieved);
    }

    useEffect(() => {
        async function fetchData(){
            //Uncomment the next line if you need to erase all data
            //await AsyncStorage.setItem("@fitfeedExerciseList", null);
            if(initialLoad){
                const exerciseItemsRetrieved = await AsyncStorage.getItem("@fitfeedExerciseList");
                if(exerciseItemsRetrieved && exerciseItemsRetrieved !== "null" && exerciseItemsRetrieved.length !== 0){
                    console.log(JSON.parse(exerciseItemsRetrieved))
                    setExerciseItems(JSON.parse(exerciseItemsRetrieved));
                }
                else{
                    setExerciseItems([]);
                }
            }
            else{
                await AsyncStorage.setItem("@fitfeedExerciseList", JSON.stringify(exerciseItems));
            }
            setInitialLoad(false);
        }
        fetchData();
    }, [exerciseItems]);

    return (  
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style = {styles.sectionTitle}>Exercises</Text>
                <View style={styles.items}>
                    {
                        exerciseItems.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => addToActiveList(item)}>
                                    <ExerciseItem name={item.name} color={item.color} index={index} onChangeName={(newName, index) => changeCourse(newName, index)} onColor={() => changeColor(index)} onDelete={() => deleteCourse(index)}/>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>

            <KeyboardAvoidingView behaviour = {Platform.OS === "ios" ? "padding" : "height"} style={styles.writeCourseWrapper}>
                <TextInput style={styles.input} placeholder={"Add an Exercise"} value={exercise} onChangeText={(text) => setExercise(text)} onSubmitEditing={() => createCourse()}/>
            </KeyboardAvoidingView>

            <View style={styles.tasksWrapper}>
                <Text style = {styles.sectionTitle}>Exercises</Text>
                <View style={styles.items}>
                    {
                        activeExerciseItems.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => removeFromActiveList(index)}>
                                    <ExerciseItem name={item.name} color={item.color} index={index} onChangeName={(newName, index) => changeCourse(newName, index)} onColor={() => changeColor(index)} onDelete={() => deleteCourse(index)}/>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '90%',
    },
    items:{
        gap: globalStyles.exerciseIconSize/2
    },
    input:{
        marginTop: globalStyles.exerciseIconSize/2,
        fontSize: globalStyles.normalTextSize,
        fontFamily: globalStyles.normalTextFont
    }
});

export default ExerciseList;
