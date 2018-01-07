const Article = require('../models/article');
const Comment = require('../models/comments');
const scraper = require('../controller/scraper');

module.exports = app => {

	const setSaved = (id, saved) => {
		console.log(id);
		return Article.findByIdAndUpdate(
			id, {
				saved
			}, {
				new: true
			}
		);
	};

	app.get('/scrape', (req, res) => {
		// res.json(articles)
		scraper()
			.then(data => {
				Article.create(data, (err, newArticles) => {
					if (err) console.log(err);
					res.json(newArticles);
				});
			})
			.catch(err => res.status(400).send(err));
	});

	app.get('/articles', (req, res) => {
		Article.find({})
			.then(articles => res.json(articles))
			.catch(err => res.status(500).json(err));
	});

	app.route('/articles/save')
		.get((req, res) => {
			Article
				.find({ saved: true })
				.then(articles => res.json(articles))
				.catch(err => res.status(500).send(err.message));
		})
		.post((req, res) => {
			setSaved(req.body.id, true)
				.then(article => res.json(article))
				.catch(err => res.status(404).json(err));
		});

	app.post('/articles/unsave', (req, res) => {
		setSaved(req.body.id, false)
			.then(article => res.json(article))
			.catch(err => res.status(404).json(err));
	});

	//Comments
	app.route('/articles/:id')
		.post((req, res) => {
			Comment.create(req.body)
				.then(comment => {
					return Article.findOneAndUpdate({
						_id: req.params.id
					}, {
						comments: comment._id
					});
				})
				.then(article => {
					res.json(article);
				})
				.catch(err => res.json(err));
		})
		.get((req, res) => {
			console.log(`line 70 ${req.params.id}`);
			Article.findOne({	_id: req.params.id })
				.populate('comments')
				.then(article => res.json(article))
				.catch(err => res.status(404).send(err.message));
		})
		.delete((req, res) => {
			Comment.remove({ _id: req.body })
				.then(() => Article.findOneAndUpdate({
					_id: req.params
				}, {
					$pull: {
						comments: req.body
					}
				}, {
					new: true
				}))
				.catch(err => res.status(400).json({
					message: err.message
				}));
		});

};