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
            "imageUrl": "https://images.unsplash.com/photo-1534336810865-0beae4c81278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxPcmdhbmljJTIwQXBwbGUlMjBKdWljZXxlbnwwfHx8fDE3MjQ1NDY1Nzd8MA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Bio Öpfelsaft",  // Organic Apple Juice
            "expirationDate": "2024-10-05",
            "productId": "12345678",
            "location": "3012 Bern",
            "address": "Münsterplatz 1"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1549438247-223f2db1dd29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxXaG9sZSUyMFdoZWF0JTIwQnJlYWR8ZW58MHx8fHwxNzI0NTQ2NjIzfDA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Vollkorn Brot",  // Whole Wheat Bread
            "expirationDate": "2024-11-15",
            "productId": "23456789",
            "location": "3012 Bern",
            "address": "Kramgasse 12"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1626196340104-2d6769a08761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxBbG1vbmQlMjBNaWxrfGVufDB8fHx8MTcyNDU0NjY4Nnww&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Mandelmilch",  // Almond Milk
            "expirationDate": "2024-09-22",
            "productId": "34567890",
            "location": "3012 Bern",
            "address": "Marktgasse 15"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1464195157370-5b596406ff80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxHcmFub2xhJTIwQmFyc3xlbnwwfHx8fDE3MjQ1NDY3MTV8MA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Granola Riegel",  // Granola Bars
            "expirationDate": "2024-08-30",
            "productId": "45678901",
            "location": "3012 Bern",
            "address": "Gerechtigkeitsgasse 3"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1697634636056-4616b23873e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxHcmVlayUyMFlvZ3VydHxlbnwwfHx8fDE3MjQ1NDY3NTh8MA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Griechisches Jogurt",  // Greek Yogurt
            "expirationDate": "2024-12-12",
            "productId": "56789012",
            "location": "3012 Bern",
            "address": "Schwarztorstrasse 7"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1523529733369-8c9cf7593bdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxEYXJrJTIwQ2hvY29sYXRlfGVufDB8fHx8MTcyNDU0NjgwNHww&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Dunkle Schoggi",  // Dark Chocolate
            "expirationDate": "2024-11-08",
            "productId": "67890123",
            "location": "3012 Bern",
            "address": "Postgasse 22"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1517260739337-6799d239ce83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxBdm9jYWRvJTIwT2lsfGVufDB8fHx8MTcyNDU0Njg0N3ww&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Avocado Öl",  // Avocado Oil
            "expirationDate": "2024-10-27",
            "productId": "78901234",
            "location": "3012 Bern",
            "address": "Bollwerk 5"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1447279506476-3faec8071eee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxRdWlub2ElMjBQYXN0YXxlbnwwfHx8fDE3MjQ1NDY4ODN8MA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Quinoa Pasta",  // Quinoa Pasta
            "expirationDate": "2024-09-15",
            "productId": "89012345",
            "location": "3012 Bern",
            "address": "Schauplatzgasse 11"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1509276343256-788728b55354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxIb25leSUyME9hdHMlMjBDZXJlYWx8ZW58MHx8fHwxNzI0NTQ2OTIwfDA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Honig-Hafer Müesli",  // Honey Oats Cereal
            "expirationDate": "2024-12-01",
            "productId": "90123456",
            "location": "3012 Bern",
            "address": "Waisenhausplatz 18"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1673292636579-2343673a945d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxDaGlhJTIwU2VlZHN8ZW58MHx8fHwxNzI0NTQ2OTYwfDA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Chia Samen",  // Chia Seeds
            "expirationDate": "2024-08-15",
            "productId": "01234567",
            "location": "3012 Bern",
            "address": "Bundesgasse 30"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1516763562359-cae9ea43851f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxDb2NvbnV0JTIwV2F0ZXJ8ZW58MHx8fHwxNzI0NTQ2OTkzfDA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Kokoswasser",  // Coconut Water
            "expirationDate": "2024-09-10",
            "productId": "11234567",
            "location": "3012 Bern",
            "address": "Zytgloggelaube 8"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1605448303632-f46b1f293e35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxQZWFudXQlMjBCdXR0ZXJ8ZW58MHx8fHwxNzI0NTQ3MDI0fDA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Erdnussbutter",  // Peanut Butter
            "expirationDate": "2024-10-20",
            "productId": "21234567",
            "location": "3012 Bern",
            "address": "Neuengasse 23"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxXaG9sZSUyMEdyYWluJTIwUmljZXxlbnwwfHx8fDE3MjQ1NDcwNTZ8MA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Vollkorn Reis",  // Whole Grain Rice
            "expirationDate": "2024-12-31",
            "productId": "31234567",
            "location": "3012 Bern",
            "address": "Spitalgasse 9"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1530448609394-9a8ce994a507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxPcmdhbmljJTIwQWxtb25kc3xlbnwwfHx8fDE3MjQ1NDcwODV8MA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Bio Mandeln",  // Organic Almonds
            "expirationDate": "2024-11-05",
            "productId": "41234567",
            "location": "3012 Bern",
            "address": "Theaterplatz 4"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1701520839071-55bdfe64c5ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxHcmVlbiUyMFRlYXxlbnwwfHx8fDE3MjQ1NDcxMTN8MA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Grüner Tee",  // Green Tea
            "expirationDate": "2024-09-25",
            "productId": "51234567",
            "location": "3012 Bern",
            "address": "Länggassstrasse 13"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1516757932457-9233f965b8d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxTdW5mbG93ZXIlMjBTZWVkc3xlbnwwfHx8fDE3MjQ1NDcxNDR8MA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Sunnenblueme Chärnli",  // Sunflower Seeds
            "expirationDate": "2024-10-15",
            "productId": "61234567",
            "location": "3012 Bern",
            "address": "Lorrainebrücke 19"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1627662235844-6f5d8f54816b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxWZWdldGFibGUlMjBDaGlwc3xlbnwwfHx8fDE3MjQ1NDcxNzB8MA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Gmües Chips",  // Vegetable Chips
            "expirationDate": "2024-12-20",
            "productId": "71234567",
            "location": "3012 Bern",
            "address": "Helvetiaplatz 6"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1580750882617-9ee40463d9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxDYXNoZXclMjBCdXR0ZXJ8ZW58MHx8fHwxNzI0NTQ3MTk0fDA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Cashewbutter",  // Cashew Butter
            "expirationDate": "2024-08-28",
            "productId": "81234567",
            "location": "3012 Bern",
            "address": "Monbijoustrasse 17"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1536739782508-c2388552aad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxPcmdhbmljJTIwVG9tYXRvJTIwU2F1Y2V8ZW58MHx8fHwxNzI0NTQ3MjI2fDA&ixlib=rb-4.0.3&q=80&w=400",
            "productName": "Bio Tomatensauce",  // Organic Tomato Sauce
            "expirationDate": "2024-09-18",
            "productId": "91234567",
            "location": "3012 Bern",
            "address": "Effingerstrasse 27"
        },
        {
            "imageUrl": "https://images.unsplash.com/photo-1608533240306-9bf2a56958c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDY4NTJ8MHwxfHNlYXJjaHwxfHxCcm93biUyMFJpY2UlMjBTeXJ1cHxlbnwwfHx8fDE3MjQ1NDcyNTF8MA&ixlib=rb-4.0.3&q=80&w=400",
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
