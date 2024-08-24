import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import {useLocalSearchParams} from 'expo-router';

const EditResults = () => {
    const info= useLocalSearchParams();
    console.log("Info: ", JSON.stringify(info));
    return (
        <View>
            <Text>Edit Results</Text>
            <Text>{JSON.stringify(JSON.parse(info.response)["choices"][0]["message"]["content"])}</Text>
        </View>
    );
}

export default EditResults;
