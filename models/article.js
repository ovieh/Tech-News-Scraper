const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	headline: {
		type: String,
		unique: true
	},
	summary: String,
	url: {
		type: String,
		unique: true,
		required: true
	},
	saved: {
		type: Boolean,
		default: false
	},
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

});

module.exports = mongoose.model('Article', articleSchema);