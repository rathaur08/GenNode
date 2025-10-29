import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINIAI_API_KEY });

async function main() {
  const response = await geminiClient.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: 'Tell me aboutAI in detail.',
  });
  // console.log('Gemini Response:', response.text);
  for await (const chunk of response) {
    const text = chunk.text;
    console.log(text);
  }
}

main();
