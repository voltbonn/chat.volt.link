// using sqlite-vss with node-sqlite3
// const sqlite3 = require("sqlite3");
// const sqlite_vss = require("sqlite-vss");

async function init_table(db) {
  return new Promise((resolve, reject) => {
    // create db if not existing
    db.run(
      `CREATE TABLE IF NOT EXISTS texts (
        rowid INTEGER PRIMARY KEY AUTOINCREMENT,
        intend TEXT NOT NULL,
        text TEXT NOT NULL,
        text_embedding TEXT NOT NULL
      )`
    , function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    }
    )
  })
}

async function add_embedding_row(db, data) {
  // data = {
  //   intend: 'test',
  //   text: 'test',
  //   text_embedding: 'test',
  // }
  return new Promise((resolve, reject) => {
    const text_embedding = data.text_embedding

    db.run(
      `INSERT INTO texts (${Object.keys(data).join(', ')}) VALUES (${Object.keys(data).map(() => '?').join(', ')})`,
      Object.values(data),
      function (err) {
        if (err) {
          reject(err)
        } else {
          const rowid = String(this.lastID)
          resolve(rowid)
        }
      }
    )
  })
}

async function delete_vss_table(db) {
  return new Promise((resolve, reject) => {
    // create db if not existing
    db.run(
      `DROP TABLE IF EXISTS vss_texts`,
      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}
async function create_vss_table(db) {
  return new Promise((resolve, reject) => {
    // create db if not existing
    db.run(
      `CREATE VIRTUAL TABLE IF NOT EXISTS vss_texts using vss0(
        text_embedding(3)
      )`,
      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}
async function update_vss (db) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO vss_texts (rowid, text_embedding) SELECT rowid, text_embedding FROM texts`,
      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}
async function init_vss_table(db) {
  await delete_vss_table(db)
  await create_vss_table(db)
  await update_vss(db)
}

async function get_rows(db) {
  return new Promise((resolve, reject) => {

    db.all(`SELECT * FROM texts LIMIT 10`, (err, rows) => {
      console.log('gr-err', err)
      console.log('gr-rows', rows)
      resolve()
    })
  })
}

async function search_embeddings(db, embedding) {
  return new Promise((resolve, reject) => {
    // (select text_embedding from texts where rowid = 1)
    db.all(
      `
      with matches as (
        SELECT rowid, distance
        FROM vss_texts
        WHERE vss_search(
          text_embedding,
          ?
        )
        LIMIT 10
      )
      SELECT
        texts.rowid,
        texts.intend,
        texts.text,
        matches.distance
      FROM matches
      LEFT JOIN texts ON texts.rowid = matches.rowid

      `,
      [embedding],
      (err, rows) => {
        console.log('se-err', err)
        console.log('se-rows', rows)
        resolve()
      }
    )
  })
}

async function add_embeddings(db) {
  const data = [
    {
      intend: 'hello',
      text: 'Hi, what can you do?',
      text_embedding: JSON.stringify([1, 2, 3]),
    },
    {
      intend: 'hello',
      text: 'Hi, wie gehts?',
      text_embedding: JSON.stringify([2, 3, 4]),
    },
    {
      intend: 'not-hello',
      text: 'Der Himmel ist blau.',
      text_embedding: JSON.stringify([10, -10, 0]),
    },
  ]
  for (const item of data) {
    await add_embedding_row(db, item)
  }
}

async function start() {

  const { default: sqlite3 } = await import('sqlite3')
  const sqlite_vss = await import('sqlite-vss')

  const db_filepath = './test.sqlite' // ':memory:'
  const db = new sqlite3.Database(db_filepath)
  db.enableLoadExtension = true
  sqlite_vss.load(db)

  await init_table(db)

  // await add_embeddings(db)
  // await init_vss_table(db)

  console.log(' ')
  console.log(' rows: ')
  await get_rows(db)
  console.log(' ')
  console.log(' search_embeddings: ')
  const embedding = JSON.stringify([2, 3, 4])
  await search_embeddings(db, embedding)

  // db.get("select vss_version()", (err, row) => {
  //   console.log(row); // {vss_version(): "v0.2.0"}
  // })

}
start()
