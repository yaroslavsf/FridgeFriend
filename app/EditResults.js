import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams } from 'expo-router';

const EditResults = () => {
    const info = useLocalSearchParams();
    const products = JSON.parse(JSON.parse(info.response)["choices"][0]["message"]["content"])["products"];

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
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Edit Results</Text>
            <ScrollView horizontal pagingEnabled>
                {products.map((product) => {
                    return (
                        <View key={product.name} style={{ width: 300, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginRight: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.name} ({product.packaging})</Text>
                            <Text>Type: {product.type}</Text>
                            <Text>Category: {product.category}</Text>
                            <Text>Temperature: {product.storage_temperature}</Text>

                            {/* Image placeholder */}
                            {/*<Image source={{ uri: product.image_url }} style={{ width: 100, height: 100, marginTop: 10 }} />*/}

                            {/* Date Picker */}
                            <View style={{ marginTop: 20 }}>
                                <Text>Expiration Date:</Text>
                                {/*<DateTimePicker*/}
                                {/*    value={expirationDates[product.name] || new Date()}*/}
                                {/*    mode="date"*/}
                                {/*    display="default"*/}
                                {/*    onChange={(event, date) => onDateChange(event, date, product.name)}*/}
                                {/*/>*/}
                            </View>

                            {/* Save button */}
                            <TouchableOpacity style={{ marginTop: 20, backgroundColor: 'green', padding: 10, borderRadius: 8 }}>
                                <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default EditResults;
