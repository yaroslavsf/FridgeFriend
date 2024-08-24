import React, { useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState('');
    const [show, setShow] = useState(true);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios'); // Keep the picker open on iOS
        setDate(currentDate);

        // Format the date to DD.MM.YYYY
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        const formatted = `${day}.${month}.${year}`;
        setFormattedDate(formatted);
    };

    return (
        <View className="flex-1 justify-center items-center p-4">
            <Text className="text-lg mb-4">Selected Date: {formattedDate}</Text>
            <Button title="Select Date" onPress={() => setShow(true)} />

            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default" // Change this to "spinner" or "calendar" depending on the platform and preference
                    onChange={handleDateChange}
                    locale="en-GB" // For date formatting consistency
                />
            )}
        </View>
    );
};

export default CalendarComponent;