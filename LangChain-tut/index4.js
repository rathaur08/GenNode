import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser, CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";

import dotenv from "dotenv";
dotenv.config();

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  openAIApiKey: process.env.OPENAI_API_KEY,
})

async function chat() {
  const prompt = ChatPromptTemplate.fromTemplate("tell me about {topic} on {words} Words");

  // const formattedMsg = await prompt.formatMessages({
  //   topic: "Node.JS",
  //   words: 20
  // });

  const chain = prompt.pipe(model)
  // const chain = prompt.pipe(model).pipe(new StringOutputParser())
  // const chain = prompt.pipe(model).pipe(new CommaSeparatedListOutputParser())


  // const response = await model.invoke(chain)

  const response = await chain.invoke({
    topic: "Node.JS",
    words: 50
  })

  console.log(response.content);

}

chat();
