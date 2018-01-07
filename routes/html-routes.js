const Article = require('../models/article');

module.exports = app => {
	app.get('/', (req, res) => Article.find({
			saved: false
		})
		.then(articles => res.render('index', {
			articles
		}))
		.catch(() => res.status(404).send('page unavailable'))

	);
	// app.get("/", function(req, res) {
	// 	Article.find({
	// 		"saved": false
	// 	}, function(error, data) {
	// 		if (error) throw error;
	// 		var hbsObject = {
	// 			articles: data
	// 		};
	// 		res.render('index', hbsObject);
	// 	});
	// });


	app.get('/saved', (req, res) => Article.find({
			saved: true
		})
		.populate('comments')
		// .then(articles => res.render('index', { articles, saved: true}))
		.exec(function (error, data) {
			if (error) return console.log(error);
			const hbsObject = {
				articles: data
			};
			console.log(`the comment is ${data._id}`);
			res.render('index', hbsObject);
		})
		.catch(() => res.stats(404).send('page unavailable'))
	);

};