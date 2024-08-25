import axios from "axios";

const apiKey = "";

export const analyzeImageWithStructuredOutput = async (products, type, model = "gpt-4o-mini") => {

    const format = {
        "name": "The name of the recipe (e.g., Apple Pie, Spaghetti Carbonara).",
        "description": "The three words sentence describing the recipe (e.g., Delicious apple pie).",
        "products": {
            "productId": `The productId from this list ${JSON.stringify(products)}. Do not imagine the productId, use the provided products.`,
            "productName": `The productName from this list ${JSON.stringify(products)}. Do not imagine the productName, use the provided products.`
        },
        "ingredients": {
            "name": "The name of the ingredient (e.g., apple, spaghetti).",
            "quantity": "The quantity of the ingredient (e.g., 5, 200).",
            "unit": "The unit of measurement for the quantity (e.g., pieces, grams).",
        },
        "image_url": "Give me an image of the dish, please give anything you can find in internet (e.g., https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg).",
    }
    const data = {
        "model": "gpt-4o-mini", "messages": [{
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": `Please give me a list of recipes that can be made with the following format: ${format}, products (any of them): ${JSON.stringify(products)} and the type of dish is ${type}, give me the result in Swiss German language`
                }
            ]
        }],
        "response_format": {
            "type": "json_schema",
            "json_schema": {
                "name": "product_description",
                "schema": {
                    "type": "object",
                    "properties": {
                        "recipes": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": { "type": "string" },
                                    "description": { "type": "string" },
                                    "image_url": { "type": "string" },
                                    "products": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "productId": { "type": "string" },
                                                "productName": { "type": "string" }
                                            },
                                            "required": ["productId", "productName"],
                                            "additionalProperties": false
                                        }
                                    },
                                    "ingredients": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "name": { "type": "string" },
                                                "quantity": { "type": "string" },
                                                "unit": { "type": "string" }
                                            },
                                            "required": ["name", "quantity", "unit"],
                                            "additionalProperties": false
                                        }
                                    }
                                },
                                "required": ["name", "description", "image_url", "products", "ingredients"],
                                "additionalProperties": false
                            }
                        }
                    },
                    "required": ["recipes"],
                    "additionalProperties": false
                },
                "strict": false
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
