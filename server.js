const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoscraper';
mongoose.Promise = global.Promise;

mongoose.connect(DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind('console','MongoDB connection error'));
db.once('open', () => console.log('connected to database'));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('./public'));

// Linking routes
require('./routes/html-routes')(app);
require('./routes/api-routes')(app);




const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
module.exports = server;