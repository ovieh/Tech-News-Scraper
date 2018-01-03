const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema ({
    headline: String,
    summary: String,
    url: String,
    author: String,
    saved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Article', articleSchema);