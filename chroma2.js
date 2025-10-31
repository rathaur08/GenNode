import { CloudClient } from 'chromadb';
import { DefaultEmbeddingFunction } from '@chroma-core/default-embed';
import dotenv from 'dotenv';
import { generateEmbedding } from './index11Embedding.js';

dotenv.config();

const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE,
});

async function main() {
  const sunnyData = generateEmbedding([
    "Sunny is a 24-year-old software engineer working at Oracle.",
    "He lives in Gurgaon.",
    "He owns a Tata car.",
    "He is considered a friend.",
    "He loves to play cricket.",
    "His favorite food is pizza.",
    "Sunny has a pet dog named Bruno.",
    "He enjoys traveling on weekends."
  ])
  const collection = await client.getOrCreateCollection({
    name: 'userData',
    embeddingFunction: new DefaultEmbeddingFunction(), // ✅ required
  })
  collection.add({
    ids: ['1', '2', '3', '4', '5', '6', '7', '8'],
    documents: [
      "Sunny is a 24-year-old software engineer working at Oracle.",
      "He lives in Gurgaon.",
      "He owns a Tata car.",
      "He is considered a friend.",
      "He loves to play cricket.",
      "His favorite food is pizza.",
      "Sunny has a pet dog named Bruno.",
      "He enjoys traveling on weekends."
    ],
    embeddings: sunnyData.map((item, index) => item.embedding),
  });

  console.log('Collection created:', collection.name);
}

// main().catch(console.error);

async function findSimilarity() {
  const colors = await client.getCollection({
    name: 'colors',
  })
  const query = await generateEmbedding('sunny age?');
  // console.log(query[0].embedding);

  const result = await colors.query({
    queryEmbeddings: [query[0].embedding],
    nResults: 1,
  })
}

findSimilarity();