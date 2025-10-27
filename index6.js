import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { writeFileSync } from "fs";

const app = express();
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get('/', (req, res) => {
  res.send(`<form action="/audio" method="post">
              <input type="text" name="text" />
              <button type="submit">Conver Text in Audio</button>
            </form>`);
});


app.post('/audio', async (req, res) => {
  const text = req.body.text;

  const response = await client.audio.speech.create({
    model: "gpt-4o-mini-tts",
    input: text,
    voice: "coral",
    language: "hi",
    store: true,
  });
  console.log("Data -: ", response);
  const baseResponce = Buffer.from(await response.arrayBuffer());
  writeFileSync("audio1.mp3", baseResponce);
  res.send(`<h2>Text Converted to audio </h2>`);

});


async function main() {
  const response = await client.audio.speech.create({
    model: "gpt-4o-mini-tts",
    input: "Hello, how are you today?",
    voice: "coral",
  });
  console.log("Data -: ", response);
  const baseResponce = Buffer.from(await response.arrayBuffer());
  writeFileSync("audio1.mp3", baseResponce);
}

// main();

app.listen(3200);