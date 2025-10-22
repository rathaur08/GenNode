import OpenAI from "openai";
import dotenv from "dotenv";
import { writeFileSync } from "fs";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.TEST_KEY });

const main = async () => {
  const responce = await client.responses.create({
    model: "dall-e-2",
    input: "Generate image for a baby dog in BUS",
    size: "512x512",
    response_format: "b64_json",
    n: 1,
    store: true,
  })
  console.log("responce", responce);
  const image_data = responce.data[0].b64_json;
  const path = "./generated_image.png";
  const buffer = Buffer.from(image_data, 'base64');
  writeFileSync(path, buffer);
  console.log(`Image saved to ${path}`);
}
main();