import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import express from "express";

const app = express();

dotenv.config();

const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINIAI_API_KEY });

app.get('/', async (req, res) => {

  const response = await geminiClient.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: 'Tell me aboutAI in detail.',
  });
  // console.log('Gemini Response:', response.text);
  for await (const chunk of response) {
    const text = chunk.text;
    // console.log(text);
    if (text) {
      res.write(text);
    }
  }

  res.end("________content Completed_____");

  // res.send(`<form action="/audio" method="post">
  //             <input type="text" name="text" />
  //             <button type="submit">Conver Text in Audio</button>
  //           </form>`);
});

// async function main() {
//   const response = await geminiClient.models.generateContentStream({
//     model: 'gemini-2.5-flash',
//     contents: 'Tell me aboutAI in detail.',
//   });
//   // console.log('Gemini Response:', response.text);
//   for await (const chunk of response) {
//     const text = chunk.text;
//     console.log(text);
//   }
// }

// main();

app.listen(3200);