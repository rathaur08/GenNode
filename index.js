import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const response = await openai.responses.create({
//   model: "gpt-5-nano",
//   model: "gpt-5",
  model: "gpt-4o-mini",
  input: "Apple color is",
  store: true,
});


console.log(response);



// response.then((result) => console.log(result.output_text));