import OpenAI from "openai";
import dotenv from 'dotenv'
import { writeFileSync } from 'fs'
dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const data = ["cat", "dog", "apple"];

async function main() {

  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: "dog"
  })

  console.log(response.data[0].embedding);

  writeFileSync("dog.json", JSON.stringify(response.data[0].embedding))

}

main();