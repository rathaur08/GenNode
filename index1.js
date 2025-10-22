import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

let testKey = "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"; // ✅ secure key
const openai = new OpenAI({ apiKey: process.env.TEST_KEY || testKey });

const context = [
  { role: "system", content: "Keep Answer Short and Simple" },
]

async function aiAnswer(question) {
  context.push({ role: "user", content: question });
  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: context,
    store: true,
  });
  context.push({ role: "assistant", content: response.output_text });
  console.log("Data -: ", response.output_text);
}

// aiAnswer();

process.stdout.write("ask your Questions: ");
process.stdin.on("data", async (data) => {
  const question = data.toString().trim();
  aiAnswer(question);
  if (question.toLowerCase() === "exit") {
    process.exit();
  }
});
