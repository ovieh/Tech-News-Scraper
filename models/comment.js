const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    test: String,
    createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', commentSchema);