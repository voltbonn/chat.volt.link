const fs = require('fs');
const { IndexFlatL2 } = require('faiss-node');

const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

const labels_db_filename = 'vector_labels_3.db';
const faiss_index_filename = 'vector_faiss_3.index';
const faiss_dimensions = 10;

let cached_db = null;
async function load_db() {
  if (cached_db !== null) {
    return cached_db;
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
function load_index({
  dimensions = faiss_dimensions,
} = {}) {
  let index = null

  if (cached_index !== null) {
    index = cached_index;
  }

  if (index === null) {
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

function delete_index_and_label_table () {
  if (fs.existsSync(faiss_index_filename)) {
    fs.unlinkSync(faiss_index_filename);
  }
  cached_index = null;

  if (fs.existsSync(labels_db_filename)) {

    const db = await load_db();
    await db.exec('DROP TABLE IF EXISTS labels')
  }
}

async function add_label_to_db(id, label) {
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
  const index = load_index()

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
  await add_label_to_db(id, label);
}

async function search_index(embedding, k) {
  const index = load_index()

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
  // inserting data into index.
  for (let item of items) {
    await add_to_index(item.label, item.embedding)
  }

  // Save index
  const index = load_index()
  index.write(faiss_index_filename);

  const added_embeddings_count = index.ntotal() // total amount of embeddings in index
  return added_embeddings_count
}

async function retrain_embeddings(items) {

  // START create new faiss index with correct dimensions

  delete_index_and_label_table(); // delete old index and db

  const dimensions = items[0].embedding.length
  load_index(dimensions)

  // END create new faiss index with correct dimensions

  return await add_embeddings(items)
}

async function search_embeddings(embedding, amount) {
  const texts = await search_index(embedding, amount);
  return texts;
}

function example () {
  const empty = [0, 0, 0, 0, 0, 0, 0, 0]
  const items = [
    { label: 'a', embedding: [0, 1, ...empty] },
    { label: 'b', embedding: [2, 2, ...empty] },
    { label: 'c', embedding: [2, 3, ...empty] },
    { label: 'd', embedding: [3, 4, ...empty] },
    { label: 'e', embedding: [4, 5, ...empty] },
    { label: 'f', embedding: [5, 6, ...empty] },
    { label: 'g', embedding: [6, 7, ...empty] },
  ];

  retrain_embeddings(items)
    .then(added_embeddings_count => {

      console.log('added_embeddings_count', added_embeddings_count)

      search_embeddings([10, 0, ...empty], 4)
        .then(results => console.log('results', results))

    })
}
example()


module.exports = {
  add_embeddings,
  retrain_embeddings,
  search_embeddings,
}
