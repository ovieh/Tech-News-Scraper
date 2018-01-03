const express = require('express');
const app = express();
const logger = require('morgan');

const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongonews';

const db = mongoose.createConnection(DB_URI, {
    useMongoClient: true
});

db.on('error', console.error.bind('console','MongoDB conneciton error'));
db.once('open', () => console.log('connected to database'));

app.use(logger('dev'));


// Linking routes
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);



const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
module.exports = server;