const isDevEnvironment = process.env.environment === 'dev' || false
const path = require('path')

const http = require('http')

const express = require('express')
const rateLimit = require('express-rate-limit')

// const { fetch } = require('cross-fetch')

// const fs = require('fs')

const { ask_the_bot_with_setup } = require('./chat.js')

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
  message: 'Too many requests from this IP. We only allow 120 requests per IP per day.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})) // apply rate limiter to all requests

app.post('/api/chat', async (req, res) => {
  let messages = req.body.messages || []
  if (Array.isArray(messages) === false) {
    res.json({
      response: null,
      error: 'Plase enter a text.'
    })
    return
  }

  messages = messages
    .filter(message => {
      return (
        typeof message === 'object'
        && message !== null
        && typeof message.role === 'string'
        && typeof message.content === 'string'
      )
    })

  if (messages.length === 0) {
    res.json({
      response: null,
      error: 'Plase enter a text.'
    })
    return
  }

  if (JSON.stringify(messages).length > 2000) {
    res.json({
      response: null,
      error: 'The text is too long.'
    })
    return
  }

  // the last message should not be from the assistant
  if (messages[messages.length - 1].role === 'assistant') {
    res.json({
      response: null,
      error: 'The last message should not be from the assistant.'
    })
    return
  }


  try {
    const full_text = await ask_the_bot_with_setup(
      messages,
      // [
      //   { role: 'user', content: 'Was ist Volt Europa?' },
      // ],
      null
      // token => {
      //   process.stdout.write(token)
      //   // let node wait for 100 ms
      //   // Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
      // }
    )

    res.json({
      response: full_text,
      error: null,
    })
  } catch (error) {
    console.error(error)
    res.json({
      response: '',
      error: String(error),
    })
  }
  
})

app.use(express.static(static_files_path))

const port = 4008
const host = '0.0.0.0' // Uberspace wants 0.0.0.0
http.createServer(app).listen({ port, host }, () => {
  console.info(`
    🚀 Server ready
    For uberspace: http://${host}:${port}/
    For local development: http://localhost:${port}/
  `)
})

