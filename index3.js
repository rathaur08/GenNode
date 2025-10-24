import OpenAI from "openai";
import dotenv from "dotenv";
import { createReadStream } from "fs";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.TEST_KEY });

async function main() {
  const response = await client.audio.transcriptions.create({
    model: "whisper-1",
    file: createReadStream("abcd.mp3"),
    language: "en",
    store: true,
  });
  console.log("Data -: ", response);
  const rewText = response.text;
  writeFileSync("audiotoText.txt", rewText, "utf-8");

}

main();