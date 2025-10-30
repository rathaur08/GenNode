import { readFileSync } from 'fs'
import { generateEmbedding } from './index.js';

let embeddingData = readFileSync('sunnyEmbedding.json');
embeddingData = JSON.parse(embeddingData);
// console.log(embeddingData);

// let suggestion = await generateEmbedding("who is sunny");
// let suggestion = await generateEmbedding("how old is sunny");
// let suggestion = await generateEmbedding("which car sunny own?");
let suggestion = await generateEmbedding("what job sunny do?");

suggestion = suggestion[0].embedding
// console.log(animal);


let similarity = embeddingData.map((embeddingItem) => {
  const embedding = embeddingItem.embedding;
  return embedding.map((item, index) => {
    return embedding[index] * suggestion[index]
  }).reduce((a, b) => a + b, 0)

})

similarity = similarity.map((item, index) => {
  return { value: similarity[index], input: embeddingData[index].input }
})

similarity.sort((a, b) => b.value - a.value)
console.log(similarity[0]);


// const data = panda.map((item,index)=>{
//     return panda[index]*elephant[index]
// }).reduce((a,b)=>a+b,0)
// console.log(data);