const Article = require('../models/article');

module.exports = app => {
	app.get('/', (req, res) => Article.find()
		.then(articles => res.render('index', { articles }))
		.catch( () => res.status(404).send('page unavailable'))
	);
	
	app.get('/saved', (req, res) => Article.find({ saved: true })
		.then(articles => res.render('index', { articles, saved: true}))
		.catch( () => res.stats(404).send('page unavailable'))
	);

};