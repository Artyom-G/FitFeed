import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, SafeAreaView, TextInput, Text, StyleSheet, ActivityIndicator, FlatList, Image } from "react-native";
import filter from 'lodash.filter';

const API_ENDPOINT = `https://randomuser.me/api/?results=40`;

export const SearchUsers = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetchData(API_ENDPOINT)
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

    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (user) => {
            return contains(user, formattedQuery);
        });
        setData(filteredData);
    }

    const contains = ({name, email}, query) => {
        const {first, last} = name;

        if(first.includes(query) || last.includes(query) || email.includes(query)){
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
            <FlatList data={data} keyExtractor={(item) => item.login.username} renderItem={({item}) => (
                <View style={styles.itemContainer}>
                    <Image source={{uri: item.picture.thumbnail}} style={styles.image}/>
                    <View>
                        <Text style={styles.textName}>{item.name.first} {item.name.last}</Text>
                        <Text style={styles.textEmail}>{item.email}</Text>
                    </View>
                </View>
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