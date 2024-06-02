import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { PostItem } from "./postItem";
import { useRoute } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';

export const PostsTab = () => {
    const route = useRoute();
    const { user } = route.params;

    const [images, setImages] = useState([]);

    useLayoutEffect(() => {
        listItems();
    }, [user]);

    const listItems = async () => {
        try {
            const storageRef = storage().ref().child(`users/${user.uid}`);
            const res = await storageRef.listAll();
            const itemsWithMetadata = await Promise.all(res.items.map(async item => {
                const url = await item.getDownloadURL();
                const metadata = await item.getMetadata();
                return {
                    url,
                    updated: metadata.updated
                };
            }));
    
            const sortedItems = itemsWithMetadata.sort((a, b) => new Date(b.updated) - new Date(a.updated));
            const sortedUrls = sortedItems.map(item => item.url);
            setImages(sortedUrls);
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