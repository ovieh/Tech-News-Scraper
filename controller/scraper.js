const request = require("request");
const cheerio = require("cheerio");

const parseArticle = article => {
	const $ = cheerio(article);

	return {
		headline: $.find('h2.css-1dq8tca').text().trim(),
		summary: $.find('p.css-1echdzn').text().trim(),
		url: $.find('a').attr('href')
	}
}

const parseHtml = html => {
	const $ = cheerio.load(html);
	const articles = [];
	$('div.css-1cp3ece').each((i, e) => articles.push(parseArticle(e)));
	console.log("scraped");
	console.log(articles)
	return articles;
}

module.exports = function scrape() {
	const URL = 'https://www.nytimes.com/section/technology';

	return new Promise((resolve, reject) => {
		request(URL, (err, res, body) => {
			if (err) {
				return reject(err);
			}
			return resolve(parseHtml(body));
		});
	});

}