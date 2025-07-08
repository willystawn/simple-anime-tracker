import { GoogleGenAI } from "@google/genai";
import { Recommendation } from '../types';

const apiKey = process.env.API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey: apiKey }) : null;

export const getAnimeRecommendation = async (animeList: string[]): Promise<Recommendation> => {
    if (!ai) {
        throw new Error("Gemini API is not configured. Please set the API_KEY environment variable.");
    }
    
    const model = 'gemini-2.5-flash-preview-04-17';

    const prompt = `
      Based on this list of anime: ${animeList.join(', ')}.
      Please recommend one new anime that I might like.
      A crucial requirement is that the recommended anime must have a high rating, specifically above 8 out of 10 on popular anime rating websites (like MyAnimeList).
      Do not recommend any anime from the list I provided.
      Provide your response as a single, clean JSON object with two keys: "title" (the anime's name) and "reason" (a short, one-sentence explanation for the recommendation, and you can mention its high rating).
      Example format: {"title": "Steins;Gate", "reason": "Because you like shows with intricate plots, you might enjoy this highly-rated sci-fi thriller."}
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        let jsonStr = response.text.trim();
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
            jsonStr = match[2].trim();
        }

        const parsedData = JSON.parse(jsonStr);
        if (parsedData.title && parsedData.reason) {
            return parsedData as Recommendation;
        } else {
            throw new Error("Invalid JSON structure from Gemini.");
        }
    } catch (error) {
        console.error("Error getting recommendation from Gemini:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to communicate with Gemini API: ${error.message}`);
        }
        throw new Error("Failed to communicate with Gemini API.");
    }
};