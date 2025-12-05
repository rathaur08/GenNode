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

  let vectorStore = new MemoryVectorStore(new OpenAIEmbeddings())
  await vectorStore.addDocuments(mydata.map(
    item => new Document({ pageContent: item })
  ))

  // console.log(vectorStore.memoryVectors);

  // Get retrieve Data in Memory Result and Print -------------

  const retrieve = vectorStore.asRetriever({
    k: 1, // result length
  })

  const results = await retrieve._getRelevantDocuments(question);
  // console.log(results);
  const resultContent = results.map(
    item => item.pageContent
  )
  // console.log(resultContent);

  // Update data in In-Memory DB --------------------

  await vectorStore.addDocuments([
    new Document({ pageContent: " I am Learning Gen AI" })
  ])
  const updatedResult = await retrieve._getRelevantDocuments("What are u learning");
  // console.log(updatedResult);

  // Delete data in In-Memory DB ---------------------------
  const filterData = mydata.filter((item) => !item.includes("I an Working in Jetsetgo"))

  vectorStore = new MemoryVectorStore(new OpenAIEmbeddings())
  await vectorStore.addDocuments(filterData.map(
    item => new Document({ pageContent: item })
  ))
  console.log(vectorStore.memoryVectors);

}

main()