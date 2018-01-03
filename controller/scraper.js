const request = require("request");
const cheerio = require("cheerio");

const parseArticle = article => {
    const $ = cheerio(article);
    
    return {
        headline: $.find('h2.headline').text().trim(),
        summary: $.find('p.summary').text().trim(),
        url: $.find('a').attr('href')
    }
}

const parseHtml = html => {
    const $ = cheerio.load(html);

    const articles = [];
    $('article.story').each((i, e) => articles.push(parseArticle(e)));
    console.log("scraped");
    return articles;
}

module.exports = function scrape() {
    const URL = 'https://www.nytimes.com/section/technology';

    return new Promise((resolve, reject) => {
        request(URL, (err, res, body) => {
            if (err) { return reject(err);}
            return resolve(parseHtml(body));
        });
    });

}

