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

const question = "what is your name ?";

async function main() {
  // Data Store in Memory -------------
  const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings())
  await vectorStore.addDocuments(mydata.map(
    item => new Document({ pageContent: item })
  ))

  // console.log(vectorStore.memoryVectors);
  const retrieve = vectorStore.asRetriever({
    k: 1, // result length
  })

  // Get Data in Memory Result and Print -------------
  const results = await retrieve._getRelevantDocuments(question);
  // console.log(results);
  const resultContent = results.map(
    item => item.pageContent
  )
  console.log(resultContent);

  // 

}

main()