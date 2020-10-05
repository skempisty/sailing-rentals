const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./src/routes');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

//connect to the database
mongoose.connect(process.env.MONGODB_URL,
    {
        // required to silence deprecation warning in stdout (https://github.com/Automattic/mongoose/issues/8156)
        useUnifiedTopology: true,
        // required to silence deprecation warning in stdout (https://github.com/Automattic/mongoose/issues/6890)
        useCreateIndex: true,
        // last 2 required to silence other deprecation warnings
        useFindAndModify: false,
        useNewUrlParser: true
    })
    .then((response) => {
        console.log(`Database connected successfully`);
    })
    .catch(err => console.log(err));

//since mongoose promise is depreciated, we override it with node's promise
mongoose.Promise = global.Promise;

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
