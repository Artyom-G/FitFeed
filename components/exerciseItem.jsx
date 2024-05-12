import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const globalStyles = require('../globalStyles.json');

const ExerciseItem = ({name, color, index, onChangeName, onColor, onDelete}) => {

    const [editting, setEditting] = useState(false);
    const [text, setText] = useState(name)

    return (  
        <View>
            {
                !editting?
                    <View style={styles.container}>
                        <TouchableOpacity>
                            <Icon name="square" size={20} color={color}/>
                        </TouchableOpacity>
                        <Text style={styles.name}>{name}</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={() => setEditting(true)}>
                                <Icon name="pencil" size={20} color={color}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={styles.container}>
                        <TouchableOpacity onPress={onColor}>
                            <Icon name="pencil-square" size={20} color={color}/>
                        </TouchableOpacity>
                        <KeyboardAvoidingView behaviour = {Platform.OS === "ios" ? "padding" : "height"} style={styles.writeCourseWrapper}>
                            <TextInput style={styles.name} placeholder={name} value={text} onChangeText={(text) => setText(text)} onSubmitEditing={() => {onChangeName(text, index); setEditting(false)}}/>
                        </KeyboardAvoidingView>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={() => {onChangeName(text, index); setEditting(false)}}>
                                <Icon name="check" size={20} color={color}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onDelete}>
                                <Icon name="trash" size={20} color={color}/>
                            </TouchableOpacity>
                        </View>
                    </View>
            }
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
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: globalStyles.iconSizeCourses*5/2,
        paddingLeft: globalStyles.iconSizeCourses/2,
    }, 
    name:{
        width: '100%',
        textAlign: 'left',
        textAlignVertical: 'center',
        paddingLeft: globalStyles.iconSizeCourses/2,
        flexGrow: 1,
        fontFamily: globalStyles.font,
        fontSize: globalStyles.normalTextSize
    },
    writeCourseWrapper:{
        width: '100%',
        justifyContent: 'left',
        flexGrow: 1
    }

});

export default ExerciseItem;
