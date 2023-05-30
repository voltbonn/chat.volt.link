const isDevEnvironment = process.env.environment === 'dev' || false
const path = require('path')

const http = require('http')

const express = require('express')
const rateLimit = require('express-rate-limit')

const crypto = require('crypto')

// const { fetch } = require('cross-fetch')

// const fs = require('fs')

// const {
//   delete_index_and_label_table,
//   add_texts_to_embedding_table,
//   get_nearest_texts,
// } = require('./embeddings.js')

const {
  ask_the_bot_with_setup,
  ask_the_bot_michael,
} = require('./chat.js')

const static_files_path = path.join(__dirname,
  isDevEnvironment
    ? '../frontend/' // '../frontend/build/'
    : '../frontend/'
)

function checkOrigin(origin) {
  return (
    typeof origin === 'string'
    && (
      origin === 'volt.link'
      || origin.endsWith('://volt.link')

      // allow from subdomains
      || origin.endsWith('.volt.link')

      || origin === 'https://policy.volteuropa.org'
      || origin.endsWith('.volteuropa.org')
      || origin.endsWith('policy.volteuropa.org')

      || origin.endsWith('.volteuropa.org')

      // allow for localhost
      // || origin.endsWith('localhost:3000')
      // || origin.endsWith('localhost:4000')
      // || origin.endsWith('0.0.0.0:3000')
      // || origin.endsWith('0.0.0.0:4000')
      // || origin.endsWith('localhost:19006')
    )
  )
}


const app = express()

// // set up rate limiter:
// app.use(rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 30, // Limit each IP to 30 requests per `window` (here, per 1 minute)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })) // apply rate limiter to all requests

app.use(express.json())

app.use(function (req, res, next) {
  // const origin = req.get('origin')
  const origin = req.header('Origin')
  if (checkOrigin(origin)) {
    req.is_subdomain = true
    req.origin = origin
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', true)
  } else {
    req.is_subdomain = false
  }

  next()
})

app.options("/*", function (req, res, next) {
  // correctly response for cors
  if (req.is_subdomain) {
    res.setHeader('Access-Control-Allow-Origin', req.origin)
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    res.sendStatus(200)
  } else {
    res.sendStatus(403)
  }
})


// set up rate limiter:
app.use('/api/chat', rateLimit({
  windowMs: 86400 * 1000, // 1 day
  max: 120, // Limit each IP to X requests per `window`
  message: `{ content: '', error: 'Too many requests from this IP. We only allow 120 requests per IP per day.' }`,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})) // apply rate limiter to all requests

async function get_next_message(messages, callback, partial_callback, options) {

  let {
    bot_name = 'default', // default / helpdesk / translate
    backend_version = 'default', // default / michael
  } = options || {}

  const default_callback_obj = {
    information: null,
    content: null,
    error: null,
  }

    // the messages should be an array
    if (Array.isArray(messages) === false) {
      callback({
        ...default_callback_obj,
        error: 'Plase enter a text.'
      })
      return
    }

    // filter out invalid messages
    messages = messages
      .filter(message => {
        return (
          typeof message === 'object'
          && message !== null
          && typeof message.role === 'string'
          && typeof message.content === 'string'
        )
      })
      .map(message => {
        return {
          role: message.role,
          content: message.content,
        }
      })

    // there should be at least one message
    if (messages.length === 0) {
      callback({
        ...default_callback_obj,
        error: 'Plase enter a text.'
      })
      return
    }

    // only use the last N messages (to prevent too long chats)
    messages = messages.slice(-9)

    // the chat should not be too long
    if (JSON.stringify(messages).length > 10000) {
      callback({
        ...default_callback_obj,
        error: 'The chat is too long. Please reload the website to start a new chat.'
      })
      return
    }

    // the last message should not be from the assistant
    if (messages[messages.length - 1].role === 'assistant') {
      callback({
        ...default_callback_obj,
        error: 'The last message should not be from the assistant.'
      })
      return
    }

    try {
      if (backend_version === 'michael') {
        const bot_response = await ask_the_bot_michael(messages)

        callback({
          ...default_callback_obj,
          information: bot_response.information,
          content: bot_response.text,
        })
      } else {
      const bot_response = await ask_the_bot_with_setup(
        { bot_name: bot_name },
        messages,
        // [
        //   { role: 'user', content: 'Was ist Volt Europa?' },
        // ],
        // null,
        bot_response => {
          // response = { information: string, text: string }
          if (typeof partial_callback === 'function') {
            partial_callback({
              ...default_callback_obj,
              information: bot_response.information,
              content: bot_response.text,
            })
          }
          // process.stdout.write(token)
          // let node wait for 100 ms
          // Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
        }
      )

      callback({
        ...default_callback_obj,
        information: bot_response.information,
        content: bot_response.text,
      })
      }
    } catch (error) {
      console.error(error)
      callback({
        ...default_callback_obj,
        content: '',
        error: String(error),
      })
    }
}
app.post('/api/chat', async (req, res) => {
  try {
    function get_next_message_callback(new_messages) {
      console.log('new_messages', new_messages)
      res.json(new_messages)
    }

    let messages = req.body.messages || []
    let bot_name = req.body.bot_name || 'default'
    let backend_version = req.body.backend_version || 'default'

    console.log('messages', messages)

    await get_next_message(messages, get_next_message_callback, null, {
      bot_name,
      backend_version,
    })
  } catch (error) {
    console.error(error)
    res.json({
      content: '',
      error: String(error),
    })
  }
})


app.get('/api/newest_document_ts', async (req, res) => { // TODO get from db
  res.json({
    timestamp: new Date().getTime(), // - 31556952,
  })
})
app.get('/api/empty_document_index', async (req, res) => {
  res.json({
    done: false,
    error: 'Not implemented yet.',
  })
  /*
  try {
    await delete_index_and_label_table()

    res.json({
      done: true,
      error: null,
    })
  } catch (error) {
    console.error(error)

    res.json({
      done: false,
      error: String(error),
    })
  }
  */
})
app.post('/api/add_documents', async (req, res) => {
  res.json({
    done: false,
    error: 'Not implemented yet.',
  })
  /*
  try {
    let documents = req.body.documents || []

    await add_texts_to_embedding_table(documents)

    res.json({
      done: true,
      documents_count: documents.length,
      error: null,
    })
  } catch (error) {
    console.error(error)

    res.json({
      done: false,
      documents_count: null,
      error: String(error),
    })
  }
  */
})
app.post('/api/nearest_documents', async (req, res) => {
  res.json({
    done: false,
    error: 'Not implemented yet.',
  })
  /*
  try {
    let document = req.body.document || ''
    let amount = parseInt(req.body.amount || 10)

    if (typeof document !== 'string' || document.length === 0) {
      throw new Error('Please enter a text.')
    }

    if (amount <= 0) {
      amount = 10
    }

    const texts = await get_nearest_texts(documents, amount)

    res.json({
      texts,
      error: null,
    })
  } catch (error) {
    console.error(error)

    res.json({
      texts: [],
      error: String(error),
    })
  }
  */
})






const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Emit welcome message on connection
io.on('connection', (socket) => {
  socket.on('ping', callback => callback())
  socket.on('query', async ({ messages = [], backend_version = 'default' }) => {
    const md5_hash = crypto.createHash('md5').update(JSON.stringify(messages)).digest('hex')

    await get_next_message(
      messages,
      data => {
        socket.emit('response', {
          ...data,
          id: md5_hash,
        });
      },
      data => {
        socket.emit('partial_response', {
          ...data,
          id: md5_hash,
        });
      },
      {
        backend_version,
      }
    )
  });

  // socket.on('disconnect', () => {
  //   console.info('user disconnected');
  // });
});








app.use(express.static(static_files_path))

const port = 4009
const host = '0.0.0.0' // Uberspace wants 0.0.0.0
server.listen({ port, host }, () => {
  console.info(`
    🚀 Server ready
    For uberspace: http://${host}:${port}/
    For local development: http://localhost:${port}/
  `)
})
