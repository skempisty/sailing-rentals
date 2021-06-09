require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('../src/routes')
const jwtAuthenticator = require('../src/middleware/jwtAuthenticator')

const app = express()

app.use(cors())

// Authentication middleware
app.use(jwtAuthenticator)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())

/**
 * Since front/back ends are hosted on same server, we need to handle routes
 * that would normally just be handled by React Router. Instead of trying to
 * GET pages, just direct to / and allow React Router to display the correct
 * view
 */
app.use((req, res, next) => {
  const apiCall = /^\/api/.test(req.url)
  const staticAssetCall = /^(\/static|\/favicon|\/manifest)/.test(req.url)

  if (!apiCall && !staticAssetCall) {
    req.url = '/'
  }

  next();
});

/**
 * Redirect http to https in production (Heroku host requires this)
 */
app.use('*', (req, res, next) => {
  if ('https' !== req.headers['x-forwarded-proto'] && 'production' === process.env.NODE_ENV) {
    res.redirect('https://' + req.hostname + req.url)
  } else {
    next()
  }
})

app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.use((err, req, res, next) => {
  console.log(err);
  next();
})

module.exports = app
