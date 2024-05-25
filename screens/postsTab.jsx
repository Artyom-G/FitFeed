import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { PostItem } from "../components/postItem";
import { useRoute } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';

export const PostsTab = () => {
    const route = useRoute();
    const { userId } = route.params;
    const [displayUserId, setDisplayUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [images, setImages] = useState([]);

    useEffect(() => {
        console.log(userId);
        setDisplayUserId(userId);
    }, [userId]);

    useEffect(() => {
        listItems();
    }, [displayUserId])

    const listItems = async () => {
        try {
            const storageRef = storage().ref().child(`users/${displayUserId}`);
            const res = await storageRef.listAll();
            const urls = await Promise.all(res.items.map(item => item.getDownloadURL()));
            setImages(urls);
            setIsLoading(false);
        } catch (err) {
            alert(err.message);
        }
    };


    if(isLoading){
        return(
            <View>
                <ActivityIndicator size={'large'} color='#5500dc'/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollview}>
                {
                    images.map((imageUri, index) => (
                        <PostItem key={index} style={styles.postItem} imageUri={imageUri} />
                    ))
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    scrollview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
});