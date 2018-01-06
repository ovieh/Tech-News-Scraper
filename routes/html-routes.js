const Article = require('../models/article');

module.exports = app => {
	app.get('/', (req, res) => Article.find()
		.then(articles => res.render('index', { articles }))
		.catch( () => res.status(404).send('page unavailable'))
	);
	
	app.get('/saved', (req, res) => Article.find({ saved: true })
		.populate('comments')
		// .then(articles => res.render('index', { articles, saved: true}))
		.then(articles => {
			const hbsObject = { articles: articles };
			res.render('index', hbsObject);
		})
		.catch( () => res.stats(404).send('page unavailable'))
	);

};