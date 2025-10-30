import OpenAI from "openai";
import dotenv from 'dotenv'
import { writeFileSync } from 'fs'
dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const data = ["cat", "dog", "apple"];

async function main() {

  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: data
  })

  const manageEmbedding = response.data.map((item, index) => {
    const itemKey = data[index]
    return { [itemKey]: item.embedding }
  })

  writeFileSync("embedding.json1", JSON.stringify(manageEmbedding))

}

main();