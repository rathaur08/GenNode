import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import express from "express";
import multer from 'multer';
import path from "path";
import { createReadStream, unlinkSync, writeFileSync } from "fs";
import { readFileSync } from "fs"

const app = express();
dotenv.config();

const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINIAI_API_KEY });

const upload = multer({ dest: 'uploads' });

app.get('/', (req, res) => {
  res.send(`<form action="/upload" method="post" enctype="multipart/form-data">
              <input type="file" name="image" />
              <button type="submit">Upload Image</button>
            </form>`);
});


app.post('/upload', upload.single("image"), async (req, res) => {
  const path = req.file.path;

  res.send(await main(path));

});

async function main(path) {
  const base64Img = readFileSync(path, {
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
        text: "Read text from this image detail."
      }
    ],
  });
  // console.log('Gemini Response:', response.text);
  return response.text;
}

// main();
app.listen(3200);