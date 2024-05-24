import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { PostItem } from "../components/postItem";
import { useRoute } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';

export const PostsTab = () => {
    const route = useRoute();
    const { userId } = route.params;

    const [images, setImages] = useState([]);

    useEffect(() => {
        listItems();
        console.log(images);
    }, []);

    const listItems = async () => {
        try {
            const storageRef = storage().ref().child(`users/${userId}`);
            const res = await storageRef.listAll();
            const urls = await Promise.all(res.items.map(item => item.getDownloadURL()));
            setImages(urls);
        } catch (err) {
            alert(err.message);
        }
    };

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