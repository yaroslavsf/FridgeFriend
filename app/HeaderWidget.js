import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Link } from 'expo-router';


const HeaderWidget = ({ title }) => {
    return (
        <View className="flex-row items-center justify-between w-full mt-10">
            <Text className="text-3xl font-bold ml-5">{title}</Text>
            <Link href="../profile">
                <Icon name="person-circle-outline" size={35} color="#000" className="mr-5" />
            </Link>
        </View>
    );
};


export default HeaderWidget;