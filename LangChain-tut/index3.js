import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts"

import dotenv from "dotenv";
dotenv.config();

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  openAIApiKey: process.env.OPENAI_API_KEY,
})

async function chat() {
  const prompt = ChatPromptTemplate.fromTemplate("tell me about {topic} on {words} Words");

  const formattedMsg = await prompt.formatMessages({
    topic: "Node.JS",
    words: 20
  });

  const response = await model.invoke(formattedMsg)
  console.log(response.content);

}

chat();
