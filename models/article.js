const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema ({
    headline: String,
    summary: String,
    url: String
});

module.exports = mongoose.model('Article', articleSchema);