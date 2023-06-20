require('dotenv').config()

const fs = require('fs')
const YAML = require('yaml')

const cosine_similarity = require('compute-cosine-similarity')

const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)



global.embeddings_cache = null
global.intends_cache = null



function load_embeddings_cache () {
  if (global.embeddings_cache !== null) {
    return global.embeddings_cache
  }

  if (!fs.existsSync('./embeddings_cache.json')) {
    global.embeddings_cache = {}
    return global.embeddings_cache
  }

  global.embeddings_cache = JSON.parse(fs.readFileSync('./embeddings_cache.json', 'utf8') || '{}') || null

  if (global.embeddings_cache === null) {
    global.embeddings_cache = {}
  }

  return global.embeddings_cache

}

function save_embeddings_cache () {
  fs.writeFileSync('./embeddings_cache.json', JSON.stringify(global.embeddings_cache), 'utf8')
}

async function get_openai_embedding(text) {
  const response = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: text,
  })

  if (response.data.data.length === 0) {
    throw new Error('no embedding found')
  }

  return response.data.data[0].embedding
}

async function get_embedding(text, cache_embeddings = false) {
  if (global.embeddings_cache.hasOwnProperty(text)) {
    return global.embeddings_cache[text]
  }

  const embedding = await get_openai_embedding(text)
  if (cache_embeddings === true) {
    global.embeddings_cache[text] = embedding
    await save_embeddings_cache()
  }

  return embedding
}

async function load_intends_file() {
  const file = fs.readFileSync('./intends.yml', 'utf8')
  const intends = YAML.parse(file)

  global.intends_cache = []

  const intend_keys = Object.keys(intends.intends)
  for (const intend_key of intend_keys) {
    const exmaples = intends.intends[intend_key]
    for (const example of exmaples) {
      global.intends_cache.push({
        intend: intend_key,
        example: example,
        // embedding: await get_embedding(example, true), // true = cache embeddings
      })
    }
  }

  return global.intends_cache
}

async function embedding_similarity(embedding1, embedding2) {
  const similarity = cosine_similarity(embedding1, embedding2)
  return similarity
}

async function get_intend(text) {
  // NOTE this isn't working quite as expected
  return {
    intend: null,
    similarity: 0,
    example: null,
  }

  await load_embeddings_cache()
  const intends_cache = await load_intends_file()
  const text_embedding = await get_embedding(text, false) // false = don't cache embedding

  const threshold = 0.3; // This can be changed as per the need.
  let maxSimilarity = 0;
  let maxIntentKey;
  let maxExample;

  for (const intend_data of intends_cache) {
    const intend_key = intend_data.intend
    const intent_embedding = await get_embedding(intend_data.example, true) // true = cache embedding

    const similarity = await embedding_similarity(intent_embedding, text_embedding);
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      maxIntentKey = intend_key;
      maxExample = intend_data.example;
    }
  }

  if (maxSimilarity < threshold) {
    return {
      intend: null,
      similarity: 0,
      example: null,
    }
  }

  return {
    intend: maxIntentKey,
    similarity: maxSimilarity,
    example: maxExample,
  }
}

// async function example () {
//   const user_input = 'ich möchte die antwort verbessern'

//   const { intend, similarity } = await get_intend(user_input)
//   if (intend === null) {
//     console.log('Didn\'t get it. Can you please type it again?')
//   } else {
//     console.log('The detected intent is:', intend, similarity)
//   }
// }
// example()

module.exports = {
  get_intend,
}
