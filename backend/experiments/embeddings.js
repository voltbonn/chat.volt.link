require('dotenv').config()

const fs = require('fs');
const { IndexFlatL2 } = require('faiss-node');

const sqlite3 = require('sqlite3')
const { open } = require('sqlite')


const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)



// START get best labels with faiss

const folder_path = './db/'

const labels_db_filename = `${folder_path}vector_labels_3.db`
const faiss_index_filename = `${folder_path}vector_faiss_3.index`
const faiss_dimensions = 10 // is automatically set to the dimension of the first embedding

let cached_db = null;
async function load_db() {
  if (cached_db !== null) {
    return cached_db;
  }

  if (!fs.existsSync(folder_path)) {
    fs.mkdirSync(folder_path);
  }

  const db = await open({
    filename: labels_db_filename,
    driver: sqlite3.cached.Database,
  })

  cached_db = db;

  return db
}

async function create_labels_table() {
  const db = await load_db();
  await db.exec('CREATE TABLE IF NOT EXISTS labels(id INTEGER PRIMARY KEY UNIQUE, label STRING);')
}

let cached_index = null;
function load_index(options) {
  const {
    dimensions = faiss_dimensions,
  } = options || {};

  let index = null

  if (cached_index !== null) {
    index = cached_index;
  }

  if (index === null) {
    if (!fs.existsSync(folder_path)) {
      fs.mkdirSync(folder_path);
    }

    // check if file exists
    if (!fs.existsSync(faiss_index_filename)) {
      index = new IndexFlatL2(dimensions);
    } else {
      index = IndexFlatL2.read(faiss_index_filename);
    }
    cached_index = index;

    console.log('getDimension', index.getDimension()); // 2
    console.log('isTrained', index.isTrained()); // true
    console.log('ntotal', index.ntotal()); // 0
  }

  return index;
}

async function delete_index_and_label_table() {
  if (fs.existsSync(faiss_index_filename)) {
    fs.unlinkSync(faiss_index_filename);
  }
  cached_index = null;

  if (fs.existsSync(labels_db_filename)) {

    const db = await load_db();
    await db.exec('DROP TABLE IF EXISTS labels')
  }
}

async function save_label_to_db(id, label) {
  const db = await load_db();

  // create a SQL statement to insert or update the data
  const sql = `
    INSERT INTO labels (id, label)
    VALUES (?, ?)
    ON CONFLICT (id) DO UPDATE SET id = excluded.id, label = excluded.label
  `

  // execute the SQL statement with the data
  const result = await db.run(sql, id, label);

  return result.changes > 0 // true if a row was changed (inserted or updated)
}

async function get_label_from_db(ids) {
  const db = await load_db();

  try {
    const query = `SELECT id, label FROM labels WHERE id IN (${ids.join(',')})`;
    const rows = (await db.all(query))
      .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
    const labels = rows.map(row => row.label);
    return labels;
  } catch (error) {
    console.error('error when getting label', error);
    return [];
  }
}

async function add_to_index(label, embedding) {
  const index = load_index({ dimensions: embedding.length})

  if (index.ntotal() > 0) {
    const results = index.search(embedding, 1);
    const distance = results.distances[0]

    if (distance === 0) {
      // embedding already exists in faiss index
      return;
    }
  }

  index.add(embedding);

  const results = index.search(embedding, 1);
  const id = results.labels[0] // this is basicly an auto increment number. but i search for it to make sure it is correct.

  // save label with id in the database
  await create_labels_table();
  await save_label_to_db(id, label);
}

async function search_index(embedding, k) {
  const index = load_index({ dimensions: embedding.length })

  if (k > index.ntotal()) {
    k = index.ntotal();
  }

  if (k === 0) {
    return [];
  }

  const results = index.search(embedding, k);

  const texts = await get_label_from_db(results.labels);
  return texts; // [ 'a', 'd', 'b', 'c' ]
}



async function add_embeddings(items) {
  if (items.length === 0) {
    return 0;
  }

  // inserting data into index.
  for (let item of items) {
    await add_to_index(item.label, item.embedding)
  }

  // Save index
  const index = load_index({ dimensions: items[0].embedding.length })
  index.write(faiss_index_filename);

  const added_embeddings_count = index.ntotal() // total amount of embeddings in index
  return added_embeddings_count
}

async function new_embeddings_index(dimensions) {
  // START create new faiss index with correct dimensions

  await delete_index_and_label_table(); // delete old index and db

  load_index({ dimensions })

  // END create new faiss index with correct dimensions
}

async function retrain_embeddings(items) {
  const dimensions = items[0].embedding.length
  await new_embeddings_index(dimensions)
  return await add_embeddings(items)
}

// async function empty_embedding_index() {
//   await delete_index_and_label_table() // delete old index and table
//   await new_embeddings_index(1536) // create new index with correct dimensions
// }

async function search_embeddings(embedding, amount) {
  const texts = await search_index(embedding, amount);
  return texts;
}

// END get best labels with faiss



// START load embeddings from openai

// this uses some functions of the faiss-part of this file

async function create_embeddings_table() {
  const db = await load_db();
  await db.exec('CREATE TABLE IF NOT EXISTS embeddings(id INTEGER PRIMARY KEY AUTOINCREMENT, label STRING UNIQUE, embedding STRING);')
}

async function save_embedding_to_db (label, embedding) {
  const db = await load_db();

  // create a SQL statement to insert or update the data
  const sql = `
    INSERT INTO embeddings (label, embedding)
    VALUES (?, ?)
    ON CONFLICT (label) DO UPDATE SET label = excluded.label, embedding = excluded.embedding
  `

  // execute the SQL statement with the data
  embedding = JSON.stringify(embedding)
  const result = await db.run(sql, label, embedding);

  return result.changes > 0 // true if a row was changed (inserted or updated)
}

async function get_embedding_from_db(label) { // only one label and thus one embedding
  try {
    const db = await load_db();

    const result = await db.get(`SELECT embedding FROM embeddings WHERE label = (?)`, label);

    if (
      typeof result === 'object'
      && result !== null
      && result.hasOwnProperty('embedding')
      && result.embedding === 'string'
    ) {
      const embedding = JSON.parse(result.embedding)
      return embedding;
    }

    return null;
  } catch (error) {
    console.error('error when getting label', error);
    return null;
  }
}

async function get_openai_embedding (text) {
  const response = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: text,
  })

  if (response.data.data.length === 0) {
    throw new Error('no embedding found')
  }

  return response.data.data[0].embedding
}

async function get_embedding_for_text(text) {
  try {
    const embedding_from_db = await get_embedding_from_db(text)
    if (embedding_from_db !== null) {
      // embedding already exists in db
      return embedding_from_db
    }

    // load missing embedding from openai
    const embedding = await get_openai_embedding(text)
    await save_embedding_to_db(text, embedding)
    return embedding
  } catch (error) {
    console.error('error when getting embedding for text', String(error));
    return null
  }
}

async function add_texts_to_embedding_table(texts) {
  await create_embeddings_table()

  texts = (await Promise.all(
    texts
    .map(async (text) => {
      try {
        const embedding = await get_embedding_for_text(text)
        if (!Array.isArray(embedding)) {
          return null
        }

        return {
          label: text,
          embedding,
        }
      } catch (error) {
        console.error('error when getting embedding for text', String(error));
        return null
      }
    })
  ))
  .filter(Boolean) // remove null values

  add_embeddings(texts)
}

async function get_nearest_texts (text, amount) {
  const embedding = await get_embedding_for_text(text)
  if (!Array.isArray(embedding)) {
    return []
  }

  const texts = await search_embeddings(embedding, amount)
  return texts
}

// END load embeddings from openai





// async function EXAMPLE_add_embeddings_from_texts () {
//   const texts = ['hello', 'world']
//   await add_texts_to_embedding_table(texts)
// }
// EXAMPLE_add_embeddings_from_texts()



// function example() {
//   const empty = [0, 0, 0, 0, 0, 0, 0, 0]
//   const items = [
//     { label: 'a', embedding: [0, 1, ...empty] },
//     { label: 'b', embedding: [2, 2, ...empty] },
//     { label: 'c', embedding: [2, 3, ...empty] },
//     { label: 'd', embedding: [3, 4, ...empty] },
//     { label: 'e', embedding: [4, 5, ...empty] },
//     { label: 'f', embedding: [5, 6, ...empty] },
//     { label: 'g', embedding: [6, 7, ...empty] },
//   ];
//
//   retrain_embeddings(items)
//     .then(added_embeddings_count => {
//
//       console.log('added_embeddings_count', added_embeddings_count)
//
//       search_embeddings([10, 0, ...empty], 4)
//         .then(results => console.log('results', results))
//
//     })
// }
// example()


module.exports = {
  delete_index_and_label_table,
  add_texts_to_embedding_table,
  get_nearest_texts,
}
