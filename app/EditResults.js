import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import CalendarComponent from './Calendar';
import HeaderWidget from './HeaderWidget';
import { useRouter } from 'expo-router';
import { unsplash_image } from "../api/open_ai/unsplash_image";

const EditResults = () => {
    const info = useLocalSearchParams();
    const pr = JSON.parse(JSON.parse(info.response)["choices"][0]["message"]["content"])["products"];
    const router = useRouter();

    const [products, setProducts] = useState(pr);

    useEffect(() => {
        const fetchImages = async () => {
            const updatedProducts = await Promise.all(products.map(async (product) => {
                try {
                    const response = await unsplash_image(product.name);
                    return {
                        ...product,
                        imageUrl: response.data.results[0]?.urls.small || "https://via.placeholder.com/150"
                    };
                } catch (error) {
                    console.error("Error fetching image:", error);
                    return {
                        ...product,
                        imageUrl: "https://via.placeholder.com/150"  // Fallback image
                    };
                }
            }));
            setProducts(updatedProducts);
        };

        fetchImages();
    }, []);

    // State to store selected expiration dates
    const [expirationDates, setExpirationDates] = useState({});

    // Handler for date selection
    const onDateChange = (event, selectedDate, productName) => {
        const currentDate = selectedDate || expirationDates[productName];
        setExpirationDates(prevDates => ({
            ...prevDates,
            [productName]: currentDate,
        }));
    };

    return (
        <>
            <HeaderWidget title="Produktdetails" className="mr-10" />
            <View style={{ flex: 1, padding: 10 }} className="mt-10">
                <ScrollView horizontal pagingEnabled>
                    {products.map((product) => {
                        return (
                            <View key={product.name} style={{ borderWidth: 2, borderRadius: 8, marginRight: 10 }} className="w-96 mx-10 border-black p-10">
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.name} ({product.packaging})</Text>
                                <Text>Typ: {product.type}</Text>
                                <Text>Kategorie: {product.category}</Text>
                                <Text>Temperatur: {product.storage_temperature}</Text>
                                <Image source={{ uri: product.imageUrl }} style={{ width: 100, height: 100, marginTop: 10 }} />
                                {/* Date Picker */}
                                <View style={{ marginTop: 20, marginBottom: 30, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ marginRight: 10 }}>Ablaufdatum wähle:</Text>
                                    <CalendarComponent onDateChange={(event, selectedDate) => onDateChange(event, selectedDate, product.name)} />
                                </View>
                                {/* Save button */}
                                <TouchableOpacity style={{ backgroundColor: '#769C65', padding: 20, borderRadius: 8 }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Spichere</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
                <TouchableOpacity
                    className="bg-blue-500 text-white rounded-lg mt-10 mb-10  py-5 mx-10"
                    onPress={() => router.navigate('/')}
                >
                    <Text className="text-center w-full text-white">Weiter</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default EditResults;
