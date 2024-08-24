import React, { useState } from "react";

import { Text, View, TextInput, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import FoodWidget from "../FoodWidget";
import HeaderWidget from "../HeaderWidget";


const index = () => {
    const [search, setSearch] = useState('');

    const handleSearch = (text) => {
        setSearch(text);
    };

    return (
        <View className="flex-1 items-center justify-start bg-white">
            <HeaderWidget title="3011 Bern" className="w-full" />
            <View className="flex-row items-center bg-green border-2 border-gray-300 rounded-full px-4 py-3 mx-5 my-5">
                <Icon name="search" size={20} color="#000" />
                <TextInput
                    className="flex-1 ml-2"
                    placeholder="Suche..."
                    onChangeText={handleSearch}
                    value={search}
                    keyboardType="default"
                />

            </View>
            <ScrollView className="w-full">
                <FoodWidget
                    imageUrl="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    productName="Vollmilch"
                    expirationDate="28.08.2024"
                    location="3012 Bern"
                    isFavorite={true}
                />
                <FoodWidget
                    imageUrl="https://images.unsplash.com/photo-1549007953-2f2dc0b24019?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    productName="Erdbeeren"
                    expirationDate="31.08.2024"
                    location="3006 Bern"
                    isFavorite={false}
                />
                <FoodWidget
                    imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    productName="Hello World"
                    expirationDate="01.09.2024"
                    location="3012 Bern"
                    isFavorite={true}
                />
            </ScrollView>

        </View>
    );
}

export default index; 