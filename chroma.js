import { CloudClient } from 'chromadb';
import { DefaultEmbeddingFunction } from '@chroma-core/default-embed';
import dotenv from 'dotenv';

dotenv.config();

const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE,
});

async function main() {
  const collection = await client.createCollection({
    name: 'sample-data',
    embeddingFunction: new DefaultEmbeddingFunction(), // ✅ required
  });

  console.log('Collection created:', collection.name);
}

main().catch(console.error);