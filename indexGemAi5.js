import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'
import { writeFileSync } from 'fs'
import express from 'express';
import { log } from 'console';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();
const GoogleAI = new GoogleGenAI({ apiKey: process.env.GEMINIAI_API_KEY });

app.get("/", (req, resp) => {
  resp.send(`<form action="/generate" method="post">
    <input type='text' placeholder='enter your prompt' name="imageText" />
    <button>Click Me</button>
    </form>`)
})

app.post("/generate", async (req, resp) => {
  const prompt = req.body.imageText;
  await main(prompt)
  resp.send("video generated")
})



async function main(prompt) {
  let operation = await GoogleAI.models.generateVideos({
    model: "veo-3.1-generate-preview",
    prompt: prompt,
    config: {
      numberOfImages: 1
    }
  })

  // Poll the operation status until the video is ready.
  while (!operation.done) {
    console.log("please wait, video is getting read");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    operation = await GoogleAI.operations.getVideosOperation({
      operation: operation,
    });
  }

  // Download the generated video.
  GoogleAI.files.download({
    file: operation.response.generatedVideos[0].video,
    downloadPath: "video.mp4",
  });
  console.log(`Generated video saved to video.mp4`);

}



app.listen(3200)