import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "@langchain/core/documents";

import dotenv from "dotenv";
dotenv.config();

const mydata = [
  "My name is Sunny ",
  "my age in 25 years",
  "i live in Ghaziabad",
  "I an Working in Jetsetgo"
];

async function main() {
  const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings())
  await vectorStore.addDocuments(mydata.map(
    item => new Document({ pageContent: item })
  ))

  console.log(vectorStore.memoryVectors);

}

main()