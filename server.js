const express = require('express');
const app = express();
const mongoose = require("mongoose")

const PORT = process.env.PORT || 3000;

// Linking routes
require("./routes/html-routes")(app);


const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
module.exports = server;