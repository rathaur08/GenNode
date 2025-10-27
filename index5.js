import OpenAI from "openai";
import dotenv from "dotenv";
import { writeFileSync } from "fs";

dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

main();