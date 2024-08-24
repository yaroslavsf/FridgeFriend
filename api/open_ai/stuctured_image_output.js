import * as FileSystem from 'expo-file-system';
import axios from "axios";
import {instance} from "./api_config";


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

export const analyzeImageWithStructuredOutput = async (image, model = "gpt-4o-mini") => {

    const encodedImage = await encodeImage(image);

    const data = {
        model: "gpt-4o-2024-08-06",
        messages: [
            {
                role: "system",
                content: "You are a helpful math tutor. Guide the user through the solution step by step."
            },
            {
                "type": "text",
                "text": "Please describe each product in this image and give result is the following format: " + str(format)
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": `data:image/jpeg;base64,${encodedImage}`
                }
            }
        ],
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "math_reasoning",
                schema: {
                    type: "object",
                    properties: {
                        steps: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    explanation: { type: "string" },
                                    output: { type: "string" }
                                },
                                required: ["explanation", "output"],
                                additionalProperties: false
                            }
                        },
                        final_answer: { type: "string" }
                    },
                    required: ["steps", "final_answer"],
                    additionalProperties: false
                },
                strict: true
            }
        }
    }

    try {
        const result = await instance.post('', data, );

        return result.data;
    } catch (error) {
        console.error('Error making API request:', error);
        return({ error: 'Failed to fetch data' });
    }


}
