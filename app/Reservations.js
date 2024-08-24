import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodWidget from "./FoodWidget";
import HeaderWidget from "./HeaderWidget";
import { useRouter } from "expo-router";
// Initialize data if not present
const initializeData = async () => {
    const sampleData = [
        {
            imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Vollmilch",
            expirationDate: "28.08.2024",
            location: "3012 Bern",
            address: "Stockhornstrasse 22"
        },
        {
            imageUrl: "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Erdbeeren",
            expirationDate: "31.08.2024",
            location: "3006 Bern",
            address: "Stockhornstrasse 22"
        },
        {
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Hello World",
            expirationDate: "01.09.2024",
            location: "3012 Bern",
            address: "Stockhornstrasse 22"
        }
    ];

    await AsyncStorage.setItem('reservationsFoodData', JSON.stringify(sampleData));
};

const Reservations = () => {
    const router = useRouter()
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await AsyncStorage.getItem('reservationsFoodData');
                if (!data) {
                    await initializeData();
                    data = await AsyncStorage.getItem('reservationsFoodData');
                }
                setData(JSON.parse(data));
            } catch (error) {
                console.error("Failed to fetch data from AsyncStorage:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <TouchableOpacity onPress={() => router.back()} className="mt-7 ml-3 flex-row items-center">
                <Icon name="arrow-back" size={24} color="black" />
                <Text className="ml-2">Back</Text>
            </TouchableOpacity>
            <View className="flex-1 justify-center items-center bg-white">
                <HeaderWidget title="Reservationen" />
                <ScrollView style={{ flex: 1, width: '100%', marginTop: 25 }}>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <FoodWidget
                                    imageUrl={item.imageUrl}
                                    productName={item.productName}
                                    expirationDate={item.expirationDate}
                                    location={item.location}
                                    address={item.address}
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>No results found</Text>
                    )}
                </ScrollView>
            </View>
        </>
    );
}

export default Reservations;