import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {router, useLocalSearchParams, useRouter} from "expo-router";

const DetailedRecipe = () => {
    const {data} = useLocalSearchParams();
    // Accessing the data passed through route params
    const {  name, description, ingredients, products, image_url } = JSON.parse(data);

    const router = useRouter();

    // Extracting productIds from products
    const productIds = products.map(product => product.productId);

    // Function to handle the button press and navigate with productIds
    const handlePress = () => {
        router.push({
            pathname: '/',
            params: { productIds: JSON.stringify(productIds) }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dein Rezept</Text>
            <View style={styles.recipeContainer}>
                <Image source={{ uri: image_url }} style={styles.image} />
                <Text style={styles.recipeName}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <View style={styles.ingredientsContainer}>
                    {ingredients.map((ingredient, index) => (
                        <Text key={index} style={styles.ingredient}>
                            {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                        </Text>
                    ))}
                </View>
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText}>Zutaten in deiner Nähe</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    recipeContainer: {
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    recipeName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    ingredientsContainer: {
        marginBottom: 20,
    },
    ingredient: {
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#8EB55C',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default DetailedRecipe;
