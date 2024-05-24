import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, SafeAreaView, TextInput, Text, StyleSheet, ActivityIndicator, FlatList, Image } from "react-native";
import filter from 'lodash.filter';
import database from '@react-native-firebase/database';
import { UserSearchItem } from './userSearchItem';

const API_ENDPOINT = `https://randomuser.me/api/?results=40`;

export const SearchUsers = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetchDataNew();
    }, [])

    const fetchData = async(url) => {
        try{
            const response = await fetch(url);
            const json = await response.json();
            setData(json.results);
            setFullData(json.results);
            //console.log(json.results);  

            setIsLoading(false);
        }
        catch (error){
            setError(error);
            console.log(error);
            setIsLoading(false);
        }
    }

    const fetchDataNew = async () => {
        try{
            const usersRef = database().ref('/users/');
            const snapshot = await usersRef.once('value');
            const usersData = snapshot.val();
            if (usersData) {
              setData(usersData);
              setFullData(usersData);
              //console.log(usersData);
            }
            setIsLoading(false);
        }
        catch (error){
            setError(error);
            console.log(error);
            setIsLoading(false); 
        }
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (user) => {
            return contains(user, formattedQuery);
        });
        setData(filteredData);
    }

    const contains = ({name, email, username}, query) => {
        if(name.includes(query) || username.includes(query) || email.includes(query)){
            return true;
        }
        else{
            return false;
        }
    }

    if(error){
        return(
            <View>
                <Text>Error fethching data... Please check your internet connection</Text>
            </View>
        );
    }

    if(isLoading){
        return(
            <View>
                <ActivityIndicator size={'large'} color='#5500dc'/>
            </View>
        )
    }

    return (  
        <SafeAreaView style={styles.container}>
            <TextInput 
                placeholder='Search Users...'
                clearButtonMode='always' 
                style={styles.textInput} 
                autoCapitalize='none' 
                autoCorrect={false}
                value={searchQuery}
                onChangeText={(query) => handleSearch(query)}
            />
            <FlatList data={data} keyExtractor={(item) => item.username} renderItem={({item}) => (
                <UserSearchItem item={item}/>
            )} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal: 20,
        width: '98%'
    },
    textInput:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5
    },
    itemContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginTop: 10,
    },
    image:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: "600",
    },
    textEmail: {
        fontSize: 14,
        marginLeft: 10,
        color: "grey"
    }
});