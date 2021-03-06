const express = require('express')
const bodyParser = require('body-parser')
const db = require('./src/connectDb')
const routes = require('./src/routes')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 5000

db.connect()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.log(err);
    next();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
