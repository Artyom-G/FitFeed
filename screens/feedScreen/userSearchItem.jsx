import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export const UserSearchItem = ({item}) => {

    const navigation = useNavigation();

    if(item.profile){
        return (  
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProfileScreen', { passedUser: item })}>
                <Image source={{uri: item.profile.profilePicture}} style={styles.image}/>
                <View>
                    <Text style={styles.textName}>{item.profile.name}</Text>
                    <Text style={styles.textUsername}>{item.profile.username}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    else{
        return (  
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProfileScreen', { passedUser: item })}>
                <Image source={{uri: item.profilePicture}} style={styles.image}/>
                <View>
                    <Text style={styles.textName}>{item.name}</Text>
                    <Text style={styles.textUsername}>{item.username}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container:{
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
    textUsername: {
        fontSize: 14,
        marginLeft: 10,
        color: "grey"
    }
});