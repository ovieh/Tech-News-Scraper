const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
	text: { type: String, required: true },
	createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Comments', commentSchema);