import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts"

import dotenv from "dotenv";
dotenv.config();

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  openAIApiKey: process.env.OPENAI_API_KEY,
})

async function chat() {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "explane topic within 50 words"],
    ["human", `tell me about {topic} with example`]
  ])
  const formattedMsg = await prompt.formatMessages({
    topic: "javaScript"
  })

  const response = await model.invoke(formattedMsg)
  console.log(response.content);

}

chat();
