import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

let testKey = "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"; // ✅ secure key

const openai = new OpenAI({ apiKey: process.env.TEST_KEY });

// const response = openai.responses.create({
//   instructions: "Give result in 10 word.",
//   model: "gpt-4o-mini",
//   input: "Apple color is",
//   store: true,
// });

// OpenAi Roles Example
const response = openai.responses.create({
  input: [
    { role: "system", content: "Answer in Hindi Language" },
    { role: "developer", content: "give a basic example in JS" },
    { role: "user", content: "What is Coding" },
  ],
  model: "gpt-4o-mini",
});

// console.log("data key-1", response.output_text);
response.then((result) => console.log("data key-2", result.output_text));