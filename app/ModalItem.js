import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ModalItem = ({ visible, onClose, options }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);

    

    // Filter options based on search input
    const handleSearch = (text) => {
        setSearchText(text);
        if (text === '') {
            setFilteredOptions([]);
        } else {
            const filtered = options.filter(option =>
                option.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    };

    // Handle selecting an option
    const handleOptionSelect = (option) => {
        setSearchText(option);
        onClose(); // Close the modal when an option is selected
    };

    if (!visible) return null; // Return null if the modal is not visible

    return (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {visible && (
                <View className="w-11/12 mt-5 ml-5">
                    <View style={{
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 10,
                        overflow: 'hidden',
                    }}>
                        {/* Search Bar with Magnifying Glass */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#769C65',
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                        }}>
                            <Icon name="search" size={20} color="white" />
                            <TextInput
                                style={{ flex: 1, marginLeft: 10, color: 'white' }}
                                placeholderTextColor="white"
                                placeholder="Suche..."
                                onChangeText={handleSearch}
                                value={searchText}
                            />
                        </View>

                        {/* Options List */}
                        <FlatList
                            data={filteredOptions.length > 0 ? filteredOptions : options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={{
                                        padding: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: 'gray',
                                    }}
                                    onPress={() => handleOptionSelect(item)}
                                >
                                    <Text>{item}</Text>
                                </Pressable>
                            )}
                            style={{ maxHeight: 100 }} // Limit height to 3 items
                            scrollEnabled={filteredOptions.length > 3 || options.length > 3} // Enable scrolling if more than 3 items
                        />
                    </View>
                </View>
            )}
            </KeyboardAvoidingView>
        
    );
};