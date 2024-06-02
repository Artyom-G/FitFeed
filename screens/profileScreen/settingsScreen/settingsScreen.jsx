import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import SignOutButton from '../singOutButton';
import { Context } from '../../../components/globalContextProvider';
import database from '@react-native-firebase/database';
import LoadingIndicator from '../../../components/loadingIndicator';

function SettingsScreen() {

    const { user, reloadUserPlus } = useContext(Context);

    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        readFromDatabase();
        reloadUserPlus();
        setIsLoading(false);
    }, []);

    const readFromDatabase = async () => {
        database().ref(`/users/${user.uid}`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val().profile){
                    setProfile(snapshot.val().profile);
                }
                else{
                    setProfile({
                        name: snapshot.val().name,
                        username: snapshot.val().email,
                        title: 'Newcomer',
                        bio: 'My empty bio',
                        profilePicture: snapshot.val().profilePicture,
                    });
                }
            });
    }

    const writeToDatabase = async () => {
        try {
          await database().ref(`/users/${user.uid}/profile`).set(profile);
        } catch (error) {
          console.log('writeToDatabase in App.jsx Error: ', error);
        }
      };


    const handleChange = (key, value) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            [key]: value,
        }));
    };

    const onSave = () => {
        setIsLoading(true);
        writeToDatabase();
        showToastWithGravity();
        setIsLoading(false);
    }

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
          'Changes Saved',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
    };

    if(isLoading || !profile){
        return <LoadingIndicator/>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: profile.profilePicture }} style={styles.profilePicture} />
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={profile.name}
                    onChangeText={text => handleChange('name', text)}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={profile.username}
                    onChangeText={text => handleChange('username', text)}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={user.email}
                    editable={false}
                    onChangeText={text => handleChange('email', text)}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={profile.title}
                    onChangeText={text => handleChange('title', text)}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Bio</Text>
                <TextInput
                    style={styles.input}
                    value={profile.bio}
                    onChangeText={text => handleChange('bio', text)}
                    multiline
                />
            </View>
            <Button title="Save Changes" onPress={() => onSave()} />
            <SignOutButton />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    fieldContainer: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});

export default SettingsScreen;
