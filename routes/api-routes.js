const Article = require('../models/article');
const Comments = require('../models/comments');
const scraper = require('../controller/scraper');

module.exports = app => {

	const setSaved = (id, saved) => {
		return Article.findByIdAndUpdate(
			id, {
				saved
			}, {
				new: true
			}
		);
	};

	app.get('/scrape', (req, res) => {
		scraper()
			.then(data => {
				Article.create(data, (err, newArticles) => {
					if (err) console.log(err);
					res.json(newArticles);
					// console.log("blah");
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
				.find({
					saved: true
				})
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
	app.get('/articles/:id', (req, res) => {
		Article
			.findOne({_id: req.params.id })
			.populate('comments')
			.then(article => res.json(article))
			.catch(err => res.status(404).send(err.message));

	});

	app.post('/articles/:id/comments/new', (req,res) => {
		Comments
			.create(req.body)
			.then(newComment => {
				return Article.findOneAndUpdate(
					{ _id: req.params.id },
					{ $push: { comments: newComment._id }},
					{ new: true }
				);
			})
			.then(data => res.json(data))
			.catch(err => res.status(404).send(err.message));
	});

	app.post('/comments/:id/delete', (req, res) => {
		Comments.remove({ _id: req.params.id }).then(() => {
			Article
				.update(
					{ comments: req.params.id },
					{ $pullAll: { comments: [{ _id: req.params.id }] } }
				)
				.then(data => {
					res.json(data);
				});
		});
	});
		

};