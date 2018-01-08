const Article = require('../models/article');

module.exports = app => {
	app.get('/', (req, res) => {
		Article
			.find({ saved: false})
			.populate('comments')
			.then(articles => {
				res.render('index', articles);
			})
			.catch(()=> res.status(404).send('page unavailable'));
	});

	app.get('/saved', (req, res) => {
		Article
			.find({ saved: true})
			.populate('comments')
			.then(articles => {
				res.render('index', articles);
			})
			.catch(()=> res.status(404).send('page unavailable'));
	});
};