import * as FileSystem from 'expo-file-system';
import axios from "axios";

import {instance} from "./api_config";

const apiKey = "";

const encodeImage = async (imageUri) => {
    try {
        // Read the image file as a binary string
        const imageData = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        // The imageData is already in base64 format
        return imageData;
    } catch (error) {
        console.error('Error encoding image:', error);
        return null;
    }
};

const format = {
    "name": "The name of the detected item (e.g., Apple, Milk).",
    "type": "The category of the item, such as fruit, vegetable, meat, dairy, etc.",
    "amount": {
        "quantity": "The number of items or the volume of the item (e.g., 5, 1).",
        "unit": "The unit of measurement for the quantity (e.g., pieces, liters, grams)."
    },
    "image_url": "an image of a detected item, please give anything you can find in internet (e.g., https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg).",
    "category": "A broader classification, such as 'fresh', 'frozen', 'canned', etc.",
    "storage_temperature": "The optimal temperature at which the item should be stored (e.g., 4°C).",
    "packaging": "The type of packaging the item is in (e.g., loose, carton, plastic).",
}

export const analyzeImageWithStructuredOutput = async (image, model = "gpt-4o-mini") => {

    const encodedImage = await encodeImage(image);

    const data = {
        "model": "gpt-4o-mini", "messages": [{
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": `Please describe each product in this image and give result is the following format: ${format}`
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": `data:image/jpeg;base64,${encodedImage}`
                    }
                },
            ]
        }],
        "response_format": {
            "type": "json_schema",
            "json_schema": {
                "name": "product_description",
                "schema": {
                    "type": "object",
                    "properties": {
                        "products": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {"type": "string"},
                                    "type": {"type": "string"},
                                    "amount": {
                                        "type": "object",
                                        "properties": {"quantity": {"type": "string"}, "unit": {"type": "string"}},
                                        "required": ["quantity", "unit"],
                                        "additionalProperties": false
                                    },
                                    "image_url": {"type": "string"},
                                    "category": {"type": "string"},
                                    "storage_temperature": {"type": "string"},
                                    "packaging": {"type": "string"}
                                },
                                "required": ["name", "type", "image_url", "category", "storage_temperature", "packaging", "amount"],
                                "additionalProperties": false
                            }
                        }
                    },
                    "required": ["products"],
                    "additionalProperties": false
                },
                "strict": true
            }
        }
    }


    return await axios.post('https://api.openai.com/v1/chat/completions', JSON.stringify(data), {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })


}
