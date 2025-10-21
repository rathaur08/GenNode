import OpenAI from "openai";
import dotenv from "dotenv";
// import { encoding_for_model } from "tiktoken";

dotenv.config();

let testKey = "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"; // ✅ secure key

const openai = new OpenAI({ apiKey: process.env.TEST_KEY || testKey });

// const response = openai.responses.create({
//   instructions: "Give result in 10 word.",
//   model: "gpt-4o-mini",
//   input: "Apple color is",
//   store: true,
// });


const prompt = "how are you?";
const model = "gpt-4o-mini";

// OpenAi Roles Example
const response = await openai.responses.create({
  input: [
    // { role: "system", content: "Answer in 20 words" },
    // { role: "developer", content: "give a basic example in JS" },
    { role: "user", content: prompt },
  ],
  model,
  // temperature: 0,
  // max_output_tokens: 20,
  store: true,

});


const response2 = await openai.responses.retrieve("resp_0f4ee30f3ef55e5e0068f75c640cb48197ac861825db01e696")
console.log("data key-2", response2.output_text);

// console.log("data key-1", response);
// response.then((result) => console.log("data key-2", result.output_text));

// function calculateToken() {
//   const enc = encoding_for_model(model);
//   const tokenCount = enc.encode(prompt);
//   console.log("Token Count:", tokenCount);
// }

// calculateToken();