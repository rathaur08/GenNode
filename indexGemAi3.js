import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { readFileSync } from "fs"

dotenv.config();

const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINIAI_API_KEY });

async function main() {
  const base64Img = readFileSync("screenshot.png", {
    encoding: "base64"
  });

  const response = await geminiClient.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        inlineData: {
          mimeType: "image/png",
          data: base64Img,
        }
      },
      {
        text: "Read text from this image and describe it in detail."
      }
    ],
  });
  console.log('Gemini Response:', response.text);
}

main();
