import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodWidget from "../FoodWidget";
import HeaderWidget from "../HeaderWidget";
import { useLocalSearchParams, useRouter } from "expo-router";

// Initialize data if not present
const initializeData = async () => {

    const sampleData = [
        {
            imageUrl: "https://images.unsplash.com/photo-1522193128704-bcb76544ba8d?q=80&w=3125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Eier (5x)",
            expirationDate: "01.09.2024",
            location: "3010 Bern",
            address: "Stockhornstrasse 22"
        },
        {
            imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Vollmilch",
            expirationDate: "28.08.2024",
            location: "3012 Bern",
            address: "Stockhornstrasse 22"
        },
        {
            "imageUrl": "https://example.com/images/product1.jpg",
            "productName": "Bio Öpfelsaft",  // Organic Apple Juice
            "expirationDate": "2024-10-05",
            "productId": "12345678",
            "location": "3012 Bern",
            "address": "Münsterplatz 1"
        },
        {
            "imageUrl": "https://example.com/images/product2.jpg",
            "productName": "Vollkorn Brot",  // Whole Wheat Bread
            "expirationDate": "2024-11-15",
            "productId": "23456789",
            "location": "3012 Bern",
            "address": "Kramgasse 12"
        },
        {
            "imageUrl": "https://example.com/images/product3.jpg",
            "productName": "Mandelmilch",  // Almond Milk
            "expirationDate": "2024-09-22",
            "productId": "34567890",
            "location": "3012 Bern",
            "address": "Marktgasse 15"
        },
        {
            "imageUrl": "https://example.com/images/product4.jpg",
            "productName": "Granola Riegel",  // Granola Bars
            "expirationDate": "2024-08-30",
            "productId": "45678901",
            "location": "3012 Bern",
            "address": "Gerechtigkeitsgasse 3"
        },
        {
            "imageUrl": "https://example.com/images/product5.jpg",
            "productName": "Griechisches Jogurt",  // Greek Yogurt
            "expirationDate": "2024-12-12",
            "productId": "56789012",
            "location": "3012 Bern",
            "address": "Schwarztorstrasse 7"
        },
        {
            "imageUrl": "https://example.com/images/product6.jpg",
            "productName": "Dunkle Schoggi",  // Dark Chocolate
            "expirationDate": "2024-11-08",
            "productId": "67890123",
            "location": "3012 Bern",
            "address": "Postgasse 22"
        },
        {
            "imageUrl": "https://example.com/images/product7.jpg",
            "productName": "Avocado Öl",  // Avocado Oil
            "expirationDate": "2024-10-27",
            "productId": "78901234",
            "location": "3012 Bern",
            "address": "Bollwerk 5"
        },
        {
            "imageUrl": "https://example.com/images/product8.jpg",
            "productName": "Quinoa Pasta",  // Quinoa Pasta
            "expirationDate": "2024-09-15",
            "productId": "89012345",
            "location": "3012 Bern",
            "address": "Schauplatzgasse 11"
        },
        {
            "imageUrl": "https://example.com/images/product9.jpg",
            "productName": "Honig-Hafer Müesli",  // Honey Oats Cereal
            "expirationDate": "2024-12-01",
            "productId": "90123456",
            "location": "3012 Bern",
            "address": "Waisenhausplatz 18"
        },
        {
            "imageUrl": "https://example.com/images/product10.jpg",
            "productName": "Chia Samen",  // Chia Seeds
            "expirationDate": "2024-08-15",
            "productId": "01234567",
            "location": "3012 Bern",
            "address": "Bundesgasse 30"
        },
        {
            "imageUrl": "https://example.com/images/product11.jpg",
            "productName": "Kokoswasser",  // Coconut Water
            "expirationDate": "2024-09-10",
            "productId": "11234567",
            "location": "3012 Bern",
            "address": "Zytgloggelaube 8"
        },
        {
            imageUrl: "https://images.unsplash.com/photo-1668548205372-1becd11b5641?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Erbsen",
            expirationDate: "01.09.2024",
            location: "3010 Bern",
            address: "Stockhornstrasse 22"
        },
        {
            "imageUrl": "https://example.com/images/product12.jpg",
            "productName": "Erdnussbutter",  // Peanut Butter
            "expirationDate": "2024-10-20",
            "productId": "21234567",
            "location": "3012 Bern",
            "address": "Neuengasse 23"
        },
        {
            "imageUrl": "https://example.com/images/product13.jpg",
            "productName": "Vollkorn Reis",  // Whole Grain Rice
            "expirationDate": "2024-12-31",
            "productId": "31234567",
            "location": "3012 Bern",
            "address": "Spitalgasse 9"
        },
        {
            "imageUrl": "https://example.com/images/product14.jpg",
            "productName": "Bio Mandeln",  // Organic Almonds
            "expirationDate": "2024-11-05",
            "productId": "41234567",
            "location": "3012 Bern",
            "address": "Theaterplatz 4"
        },
        {
            "imageUrl": "https://example.com/images/product15.jpg",
            "productName": "Grüner Tee",  // Green Tea
            "expirationDate": "2024-09-25",
            "productId": "51234567",
            "location": "3012 Bern",
            "address": "Länggassstrasse 13"
        },
        {
            "imageUrl": "https://example.com/images/product16.jpg",
            "productName": "Sunnenblueme Chärnli",  // Sunflower Seeds
            "expirationDate": "2024-10-15",
            "productId": "61234567",
            "location": "3012 Bern",
            "address": "Lorrainebrücke 19"
        },
        {
            "imageUrl": "https://example.com/images/product17.jpg",
            "productName": "Gmües Chips",  // Vegetable Chips
            "expirationDate": "2024-12-20",
            "productId": "71234567",
            "location": "3012 Bern",
            "address": "Helvetiaplatz 6"
        },
        {
            "imageUrl": "https://example.com/images/product18.jpg",
            "productName": "Cashewbutter",  // Cashew Butter
            "expirationDate": "2024-08-28",
            "productId": "81234567",
            "location": "3012 Bern",
            "address": "Monbijoustrasse 17"
        },
        {
            "imageUrl": "https://example.com/images/product19.jpg",
            "productName": "Bio Tomatensauce",  // Organic Tomato Sauce
            "expirationDate": "2024-09-18",
            "productId": "91234567",
            "location": "3012 Bern",
            "address": "Effingerstrasse 27"
        },
        {
            "imageUrl": "https://example.com/images/product20.jpg",
            "productName": "Brauner Reissirup",  // Brown Rice Syrup
            "expirationDate": "2024-11-29",
            "productId": "10234567",
            "location": "3012 Bern",
            "address": "Laupenstrasse 14"
        }
    ];


    await AsyncStorage.setItem('foodData', JSON.stringify(sampleData));
};

const index = () => {
    const [search, setSearch] = useState('');
    const [foodData, setFoodData] = useState([]);

    const { productIds } = useLocalSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await AsyncStorage.getItem('foodData');
                if (!data) {
                    await initializeData();
                    data = await AsyncStorage.getItem('foodData');
                }
                if (productIds) {
                    const filteredData = JSON.parse(data).filter(item => productIds.includes(item.productId));
                    setFoodData(filteredData);
                } else {
                    setFoodData(JSON.parse(data));
                }
            } catch (error) {
                console.error("Failed to fetch data from AsyncStorage:", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (text) => {
        setSearch(text);
    };

    const filteredData = foodData.filter(item =>
        item.productName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <HeaderWidget title="3011 Bern" />
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#769C65', borderColor: 'gray', borderWidth: 1, borderRadius: 25, paddingHorizontal: 10, paddingVertical: 8, margin: 25 }}>
                <Icon name="search" size={20} color="white" />
                <TextInput
                    style={{ flex: 1 }}
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
                                address={item.address}
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
