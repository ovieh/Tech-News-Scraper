const express = require('express');
const app = express();
const mongoose = require("mongoose")

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'))

const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
module.exports = server;