const db = require('../models');
const Comment = require('../models/comments');
const scraper = require('../controller/scraper');

module.exports = app => {

	const setSaved = (id, saved) => {
		console.log(id);
		return db.Article.findByIdAndUpdate(
			id, 
			{ saved }, 
			{ new: true	}
		);
	};

	app.get('/scrape', (req, res) => {
		// res.json(articles)
		scraper()
			.then(data => {
				db.Article.create(data, (err, newArticles) => {
					if (err) console.log(err.message);
					res.json(newArticles);
				});
			})
			.catch(err => res.status(400).send(err));
	});

	app.get('/articles', (req, res) => {
		db.Article.find({})
			.then(articles => res.json(articles))
			.catch(err => res.status(500).json(err));
	});

	app.route('/articles/save')
		.get((req, res) => {
			db.Article.find({ saved: true })
				.then(articles => res.json(articles))
				.catch(err => res.status(500).send(err.message));
		})
		.post((req, res) => {
			setSaved(req.body, true)
				.then(article => res.json(article))
				.catch(err => res.status(404).json(err));
		});

	app.post('/articles/unsave', (req, res) => {
		setSaved(req.body, false)
			.then(article => res.json(article))
			.catch(err => res.status(404).json(err));
	});

	app.route('/comments:articleId')
		.post((req, res) => {
			console.log("line 54 " + req.body.articleId);
			const newComment = new Comment(req.body);
			newComment.save((err, comment) => {
				if (err) return res.status(400).send(err);
				console.log(` line 58 ${req.params._id}`);
				
				return db.Article.findByIdAndUpdate(
					req.body.articleId,
					{ $push: { comments: comment._id } },
					{},
					(err) => {
						if(err) return res.status(400).send(err);
						return res.json(newComment);
					}
				);
			});
		})
		.get((req, res) => {
			console.log(req.params);
			db.Article.findOne({ _id: req.params.articleId })
				.populate('comments')
				.then(art => res.json(art.comments))
				.catch(err => res.status(404).send(err.message));
		})
		.delete((req, res) => {
			Comment.remove({ _id: req.body })
				.then(() => db.Article.findOneAndUpdate(
					{ _id: req.params },
					{ $pull: { comments: req.body }},
					{ new: true }
				))
				.catch(err => res.status(400).json({ message: err.message}));
		});

};