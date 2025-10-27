import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINIAI_API_KEY });

async function main() {
  const response = await geminiClient.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'Tell me a joke about programmers.',
    config: {
      temperature: 0.7,
      // thinkingConfig: {
      //   includeThoughts: true,
      //   thinkingBudget: 100,
      // },
      systemInstruction: "tell me answers in 100 words",
    }
  });
  console.log('Gemini Response:', response.text);
}

main();
