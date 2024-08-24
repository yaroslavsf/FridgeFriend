import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import HeaderWidget from '../HeaderWidget';
import Calendar from "../Calendar.js";

const AddItem = () => {
    const [item, setItem] = useState('');

    const handleAddItem = () => {
        // Add your logic to handle adding the item here
        console.log('Item:', item);
    };

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <HeaderWidget title="Scän di Chüeuschrank!" />
            <TextInput
                placeholder="Enter item"
                value={item}
                onChangeText={setItem}
            />
            <Calendar />
            <Button title="Add" onPress={handleAddItem} />
        </View>
    );
};

export default AddItem;