import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodWidget from "./FoodWidget";
import HeaderWidget from "./HeaderWidget";
import { useRouter } from "expo-router";
import { initializeData } from "./(tabs)";

const Products = () => {
    const router = useRouter()
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await AsyncStorage.getItem('myProducts');
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
                <HeaderWidget title="Meine Produkten" />
                <ScrollView style={{ flex: 1, width: '100%', marginTop: 25 }}>
                    {data.length > 0 ? (
                        data.map((item, index) =>   {
                            return (
                                <View key={index} style={{ marginBottom: 10 }}>
                                    <FoodWidget
                                        imageUrl={item.imageUrl}
                                        productName={item.productName}
                                        expirationDate={item.expirationDate}
                                        location={item.location}
                                        address={item.address}
                                    />
                                </View>
                            )
                        })
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>No results found</Text>
                    )}
                </ScrollView>
            </View>
        </>
    );
}

export default Products;
