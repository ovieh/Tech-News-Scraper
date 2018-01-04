function scrapeArticles() {
	fetch('/scrape')
		.then(response => {
			if(response.status === 200) console.log('You did it');
			window.location.href = '/';
		});
}

function pageReady() {
	document.getElementById('scrape').onclick = scrapeArticles;
}

document.addEventListener('DOMContentLoaded', pageReady);