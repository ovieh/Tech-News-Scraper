const mongoose = require('mongoose');
constf Schema = mongoose.Schema;

const articleSchema = new Schema ({
    headline: String,
    summary: String,
    url: String
});

const Article = mongoose.model('Article', articleSchema);