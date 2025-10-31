import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  openAIApiKey: process.env.OPENAI_API_KEY,
})

async function chat() {
  const response = await model.invoke("Tell 5 frrits name")
  console.log(response.content);
}

chat();
