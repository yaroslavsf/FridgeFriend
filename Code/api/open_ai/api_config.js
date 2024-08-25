import axios from 'axios';

const url = 'https://api.openai.com/v1/chat/completions'

// Retrieve the API key securely
const apiKey = process.env.OPEN_AI_KEY;

export const openAiConfig = {headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    }}

export const instance = axios.create({baseURL: url}, openAiConfig)



