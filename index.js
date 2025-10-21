import OpenAI from "openai";
import dotenv from "dotenv";
import { encoding_for_model } from "tiktoken";

dotenv.config();

let testKey = "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"; // ✅ secure key

const openai = new OpenAI({ apiKey: process.env.TEST_KEY });

// const response = openai.responses.create({
//   instructions: "Give result in 10 word.",
//   model: "gpt-4o-mini",
//   input: "Apple color is",
//   store: true,
// });


const prompt = "What is Coding answer with explane";
const model = "gpt-4o-mini";

// OpenAi Roles Example
const response = openai.responses.create({
  input: [
    // { role: "system", content: "Answer in 20 words" },
    // { role: "developer", content: "give a basic example in JS" },
    { role: "user", content: prompt },
  ],
  model
});

// console.log("data key-1", response.output_text);
response.then((result) => console.log("data key-2", result.output_text));

function calculateToken() {
  const enc = encoding_for_model(model);
  const tokenCount = enc.encode(prompt);
  console.log("Token Count:", tokenCount);
}

calculateToken();