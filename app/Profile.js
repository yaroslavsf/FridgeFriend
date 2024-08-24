import { Link } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';



const Profile = () => {
    const router = useRouter();
    return (
        <View>
            <TouchableOpacity onPress={() => router.back()} className="mt-4 flex-row items-center">
                <Icon name="arrow-back" size={24} color="black" />
                <Text className="ml-2">Back</Text>
            </TouchableOpacity>
            <Text>Profile Component</Text>
        </View>
    );
};



export default Profile;