import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodWidget from "../FoodWidget";
import HeaderWidget from "../HeaderWidget";

// Initialize data if not present
const initializeData = async () => {
    const sampleData = [
        {
            imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Vollmilch",
            expirationDate: "28.08.2024",
            location: "3012 Bern",
            isFavorite: true
        },
        {
            imageUrl: "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Erdbeeren",
            expirationDate: "31.08.2024",
            location: "3006 Bern",
            isFavorite: false
        },
        {
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Hello World",
            expirationDate: "01.09.2024",
            location: "3012 Bern",
            isFavorite: true
        }
    ];

    await AsyncStorage.setItem('foodData', JSON.stringify(sampleData));
};

const index = () => {
    const [search, setSearch] = useState('');
    const [foodData, setFoodData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await AsyncStorage.getItem('foodData');
                if (!data) {
                    await initializeData();
                    data = await AsyncStorage.getItem('foodData');
                }
                setFoodData(JSON.parse(data));
            } catch (error) {
                console.error("Failed to fetch data from AsyncStorage:", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (text) => {
        setSearch(text);
    };

    const toggleFavorite = async (productName) => {
        const updatedData = foodData.map(item =>
            item.productName === productName
                ? { ...item, isFavorite: !item.isFavorite }
                : item
        );

        try {
            await AsyncStorage.setItem('foodData', JSON.stringify(updatedData));
            setFoodData(updatedData); // Update state to trigger re-render
        } catch (error) {
            console.error("Failed to update data in AsyncStorage:", error);
        }
    };

    const filteredData = foodData.filter(item =>
        item.productName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderWidget title="3011 Bern" />
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#769C65', borderColor: 'gray', borderWidth: 1, borderRadius: 25, paddingHorizontal: 10, paddingVertical: 8, margin: 10 }}>
                <Icon name="search" size={20} color="white" />
                <TextInput
                    style={{ flex: 1, marginLeft: 10 }}
                    placeholderTextColor="white"
                    className="text-white"
                    placeholder="Suche..."
                    onChangeText={handleSearch}
                    value={search}
                    keyboardType="default"
                />
            </View>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                            <FoodWidget
                                imageUrl={item.imageUrl}
                                productName={item.productName}
                                expirationDate={item.expirationDate}
                                location={item.location}
                                isFavorite={item.isFavorite}
                                onToggleFavorite={() => toggleFavorite(item.productName)}
                            />
                        </View>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>No results found</Text>
                )}
            </ScrollView>
        </View>
    );
}

export default index;