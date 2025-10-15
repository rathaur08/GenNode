import OpenAI from "openai";

let testKey = "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"; // ✅ secure key

const openai = new OpenAI({
  apiKey: testKey,
});

const response = openai.responses.create({
  model: "gpt-4o-mini",
  input: "Apple color is",
  store: true,
});

console.log("data key-1", response.output_text);
response.then((result) => console.log("data key-2", result.output_text));