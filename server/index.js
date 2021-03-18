require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('../src/connectDb')
const routes = require('../src/routes')

const app = express()

app.use(cors())

console.log('PORT', process.env.PORT)
const port = process.env.PORT || 5000

db.connect()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())

app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
