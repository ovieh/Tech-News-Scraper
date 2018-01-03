const Article = require("../models/article");
const Comments = require("../models/comments");

const scraper = require('../controller/scraper');

module.exports = app => {

    app.get("/api/scrape", (req, res) => {
        // res.json(articles)
        scraper()
        .then( data => {
            Article.create(data, (err, newArticles) => {
                if (err) console.log(err.message);
                res.json(newArticles);
            })
        })
        .catch( err => res.status(400).send(err) );
    });

    app.get("/api/articles", (req, res) => {
        Article.find({})
            .then( articles => res.json(articles) )
            .catch(err => res.status(500).json(err));
    });
}

