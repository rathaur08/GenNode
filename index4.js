import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import multer from 'multer';
import path from "path";
import { createReadStream, unlinkSync, writeFileSync } from "fs";

const app = express();
dotenv.config();
const client = new OpenAI({ apiKey: process.env.TEST_KEY });

app.get('/', (req, res) => {
  res.send(`<form action="/upload" method="post" enctype="multipart/form-data">
              <input type="file" name="audiofile" />
              <button type="submit">Upload Audio</button>
            </form>`);
});

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + ext);

  }
});

const upload = multer({ storage });

app.post('/upload', upload.single("audiofile"), async (req, res) => {
  const filePath = req.file.path;
  const response = await client.audio.transcriptions.create({
    model: "whisper-1",
    file: createReadStream(filePath),
    language: "en",
    store: true,
  });
  console.log("Data -: ", response);

  const outPut = response.text;
  unlinkSync(filePath); // Clean up the uploaded file
  res.send(`<h2>Transcription Result:</h2><p>${outPut}</p>`);

});

app.listen(3200);
