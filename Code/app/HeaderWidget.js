import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Link } from 'expo-router';


const HeaderWidget = ({ title }) => {
    return (
        <View className="flex-row items-center justify-between w-full mt-10 mx-10 pb-5 bg-white">
            <Text className="text-3xl font-bold ml-8">{title}</Text>
            <Link href="/Profile" className='mr-8'>
                <Icon name="person-circle-outline" size={35} color="#000" className="mr-5" />
            </Link>
        </View>
    );
};


export default HeaderWidget;