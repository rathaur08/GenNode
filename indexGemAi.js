import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINIAI_API_KEY });

async function main() {
  const response = await geminiClient.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'Telln 5 Fruits names',
    maxTokens: 150,
  });
  console.log('Gemini Response:', response.text);
}

main();
