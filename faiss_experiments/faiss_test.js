const { IndexFlatL2 } = require('faiss-node');

const fname = 'faiss.index';

const dimension = 10;
const index = new IndexFlatL2(dimension);
// const index = IndexFlatL2.read(fname);

console.log('getDimension', index.getDimension()); // 2
console.log('isTrained', index.isTrained()); // true
console.log('ntotal', index.ntotal()); // 0

const empty = [0,0,0,0, 0,0,0,0]
const embeddings = [
  { t: 'a', e: [0, 1, ...empty] },
  { t: 'b', e: [2, 2, ...empty] },
  { t: 'c', e: [2, 3, ...empty] },
  { t: 'd', e: [3, 4, ...empty] },
  { t: 'e', e: [4, 5, ...empty] },
  { t: 'f', e: [5, 6, ...empty] },
];

console.log('adding...')

// inserting data into index.
embeddings.forEach((embedding, i) => {
  // console.log(i, '=', embedding.t, '->', embedding.e);
  index.add(embedding.e);
});

console.log('ntotal', index.ntotal()); // 4

// const k = index.ntotal(); // 4 / 10 / ???
// const results = index.search([0, 0, ...empty], k);
// console.log('labels', results.labels); // [ 0, 3, 1, 2 ]
// console.log('distances', results.distances); // [ 0, 1, 4, 9 ]

function label2text(labels) {
  return labels.map((label) => embeddings.find((embedding, i) => i === label).t);
}
// // const texts = label2text(results.labels);
// // console.log('texts', texts); // [ 'a', 'd', 'b', 'c' ]')

// Save index
index.write(fname);

console.log(' ')
console.log('loading index again')

// Load saved index
const index_loaded = IndexFlatL2.read(fname);
// console.log('getDimension', index_loaded.getDimension()); // 2
console.log('ntotal', index_loaded.ntotal()); // 4

function search(embedding, k) {
  if (k > index_loaded.ntotal()) {
    k = index_loaded.ntotal();
  }
  const results = index_loaded.search(embedding, k);

  // console.log('labels', results.labels); // [ 3, 0, 1, 2 ]
  // console.log('distances', results.distances); // [ 0, 1, 1, 4 ]

  const texts = label2text(results.labels);
  return texts;
}

const texts = search([2, 1, ...empty], 3);
console.log('texts', texts); // [ 'a', 'd', 'b', 'c' ]')
