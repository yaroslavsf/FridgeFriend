import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Link, useLocalSearchParams } from 'expo-router';
import CalendarComponent from './Calendar';
import HeaderWidget from './HeaderWidget';
import { useRouter } from 'expo-router';


const EditResults = () => {
    const info = useLocalSearchParams();
    const products = JSON.parse(JSON.parse(info.response)["choices"][0]["message"]["content"])["products"];
    const router = useRouter();

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

    useEffect(() => {
        console.log(products)
    }, [])

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
