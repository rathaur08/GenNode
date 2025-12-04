import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  openAIApiKey: process.env.OPENAI_API_KEY,
})

async function chat() {
  // const response = await model.invoke("Tell 5 frrits name")
  // console.log(response.content);

  // const response = await model.batch([
  //   "top 5 country name",
  //   "top cricketers name in world"
  // ])
  // // console.log(response.content);
  // for (let i = 0; i < response.length; i++) {
  //   console.log(response[i].content);
  // }

  const response = await model.stream("top cricketers name in world")
  // console.log(response.content);
  for await (const chunk of response) {
    console.log(chunk.content);
  }

}

chat();
