import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const url = 'https://api.openai.com/v1/chat/completions'

// Retrieve the API key securely
const apiKey = await SecureStore.getItemAsync('api_key');

export const instance = axios.create({baseURL: url})


export const openAiConfig = {headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    }}
