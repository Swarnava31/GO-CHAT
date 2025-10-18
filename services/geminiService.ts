
import { GoogleGenAI, Type } from "@google/genai";
// FIX: Added .ts extension to the import path.
import type { Message } from '../types.ts';
// FIX: Added .ts extension to the import path.
import { CURRENT_USER_ID } from '../constants.ts';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this environment, we'll log an error.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const formatHistory = (messages: Message[]): string => {
    return messages.map(msg => {
        const speaker = msg.senderId === CURRENT_USER_ID ? "Me" : "Friend";
        return `${speaker}: ${msg.content}`;
    }).join('\n');
};

export const getSmartReplies = async (messages: Message[]): Promise<string[]> => {
  if (!API_KEY) return ["Can't connect to AI", "Try again later", "Looks good!"];

  const history = formatHistory(messages.slice(-5)); // Use last 5 messages for context
  const prompt = `Based on the last few messages in this conversation, suggest three short, relevant, and natural-sounding replies for "Me". The replies should be one-liners, creative, and fit the context. Do not use emojis.
    
    Conversation:
    ${history}
    
    My next reply should be:`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            replies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "An array of three short reply suggestions."
            }
          }
        },
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result.replies || [];

  } catch (error) {
    console.error("Error fetching smart replies:", error);
    return []; // Return empty array on error
  }
};


export const getConversationSummary = async (messages: Message[]): Promise<string> => {
    if (!API_KEY) return "Could not generate summary: API key not configured.";
    if (messages.length < 3) return "Not enough messages to generate a summary.";

    const history = formatHistory(messages);
    const prompt = `Summarize the key points of the following conversation in a few bullet points.

    Conversation:
    ${history}

    Summary:`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.3,
                maxOutputTokens: 150,
                // FIX: Added thinkingConfig to reserve tokens for the final output when maxOutputTokens is set.
                thinkingConfig: { thinkingBudget: 50 },
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching conversation summary:", error);
        return "Failed to generate summary.";
    }
}