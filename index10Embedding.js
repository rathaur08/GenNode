import { readFileSync, writeFileSync } from 'fs'
import OpenAI from 'openai';
import dotenv from 'dotenv'

dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateEmbedding(dataInArray) {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: dataInArray,
  })
  return response.data;
}

function createFileForEmbedding(data, file) {
  const fileData = JSON.stringify(data);
  const butterData = Buffer.from(fileData);
  writeFileSync(file, butterData)
}

async function readFile() {
  const data = readFileSync('data.json')
  const dataInArray = JSON.parse(data.toString());
  let responseData = await generateEmbedding(dataInArray);
  responseData = responseData.map((item, index) => {
    return { input: dataInArray[index], embedding: item.embedding }
  })
  createFileForEmbedding(responseData, "embedding.json")
}

// readFile()