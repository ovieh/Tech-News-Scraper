function scrapeArticles() {
	fetch('/scrape')
		.then(response => {
			if(response.status === 200) console.log('You did it');
			window.location.href = '/';
		})
		.catch(function(error) {
			console.log('Looks like there was a problem: \n', error);
		});
}

function saveArticle(event) {
	const articleId = $(event.target).attr('data-id');
	const data = { id: articleId };

	$.ajax({
		method: 'POST',
		url: '/articles/save',
		data: data
	}).done(function (article, status, response) {
		if(response.status === 200) window.location.reload();
		else console.log(`unexpected response. response status ${response.status}`);
	}).fail(function (response) { 
		console.log('failed to save article', response.status);
	});
		
}
function unSaveArticle(event) {
	const articleId = $(event.target).attr('data-id');
	const data = { id: articleId };

	$.ajax({
		method: 'POST',
		url: '/articles/unsave',
		data: data
	}).done(function (article, status, response) {
		if(response.status === 200) window.location.reload();
		else console.log(`unexpected response. response status ${response.status}`);
	}).fail(function (response) { 
		console.log(`failed to unsave article, response status ${response.status}`);
	});
		
}

function pageReady() {
	// document.getElementById('scrape').onclick = scrapeArticles;
	$('#scrape').on('click', scrapeArticles);
	$('.save').on('click', saveArticle);
	$('.unsave').on('click', unSaveArticle);


}

document.addEventListener('DOMContentLoaded', pageReady);