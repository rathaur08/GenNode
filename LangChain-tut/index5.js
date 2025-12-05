import {DallEAPIWrapper} from "@langchain/openai";


import dotenv from "dotenv";
dotenv.config();

// const model = new ChatOpenAI({
//   model: "gpt-4o-mini",
//   openAIApiKey: process.env.OPENAI_API_KEY,
// })


async function generateImages() {
  const dalleWrapper = new DallEAPIWrapper({
      openAIApiKey: process.env.OPENAI_API_KEY,
      n:1,
      model:"dall-e-3"
  })

  const imageURL = await dalleWrapper.invoke("cat jumping on bad")
  console.log(imageURL);
}

generateImages();
