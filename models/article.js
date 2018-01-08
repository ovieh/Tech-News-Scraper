const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

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
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]

});
articleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Article', articleSchema);