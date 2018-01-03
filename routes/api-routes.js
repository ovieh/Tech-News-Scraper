const Article = require("../models/article");
const Comments = require("../models/comments");

const scraper = require('../controller/scraper');

module.exports = app => {
    scraper();
    app.get("/article/scrape", (req, res) => {
        // res.json(articles)
        res.json({test: "blaj"});
    });
}