import { CloudClient } from 'chromadb';
import { DefaultEmbeddingFunction } from '@chroma-core/default-embed';
import dotenv from 'dotenv';
import { GenerateContentResponse } from '@google/genai';
import { generateEmbedding } from './index11Embedding.js';

dotenv.config();

const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE,
});

async function main() {
  const colorData = generateEmbedding("green")
  const collection = await client.getOrCreateCollection({
    name: 'colors',
    embeddingFunction: new DefaultEmbeddingFunction(), // ✅ required
  })
  collection.add({
    ids: ['1'],
    documents: ['green'],
    embeddings: [colorData[0].embedding],
  });

  console.log('Collection created:', collection.name);
}

// async function main() {
//   // const collection = await client.createCollection({
//   const collection = await client.getOrCreateCollection({
//     name: 'animal',
//     embeddingFunction: new DefaultEmbeddingFunction(), // ✅ required
//   })
//   collection.add({
//     ids: ['2'],
//     documents: ['dog'],
//     embeddings: [[1, -1, -1]],
//   });
//   console.log('Collection created:', collection.name);
// }

main().catch(console.error);