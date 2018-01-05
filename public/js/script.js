(function () {
	function scrapeArticles() {
		$.get('/scrape')
			.done(function (data, status, response) {

				let modalBody = $('#resultsModal').find('.modal-card-body');

				if (response.status === 200) {

					modalBody.text(`${data.length} articles were added!`);
					// console.log(`${data.length} articles were added!`);
				}
				$('#resultsModal').addClass('is-active');

			})
			.fail(function (error) {
				console.log('Looks like there was a problem: \n', error);
			});
	}

	function saveArticle(event) {
		const articleId = $(event.target).attr('data-id');
		const data = {
			id: articleId
		};

		$.ajax({
			method: 'POST',
			url: '/articles/save',
			data: data
		}).done(function (article, status, response) {
			if (response.status === 200) window.location.reload();
			else console.log(`unexpected response. response status ${response.status}`);
		}).fail(function (response) {
			console.log('failed to save article', response.status);
		});

	}

	function unSaveArticle(event) {
		const articleId = $(event.target).attr('data-id');
		const data = {
			id: articleId
		};

		$.ajax({
			method: 'POST',
			url: '/articles/unsave',
			data: data
		}).done(function (article, status, response) {
			if (response.status === 200) window.location.reload();
			else console.log(`unexpected response. response status ${response.status}`);
		}).fail(function (response) {
			console.log(`failed to unsave article, response status ${response.status}`);
		});

	}

	function showComments() {
		$('#commentsModal').addClass('is-active');
	}






	function pageReady() {
		// document.getElementById('scrape').onclick = scrapeArticles;
		$('#scrape').on('click', scrapeArticles);
		$('.save').on('click', saveArticle);
		$('.unsave').on('click', unSaveArticle);
		$('.comments').on('click', showComments);

		//Results modal
		$('.modal-close').click(function () {
			$('#resultsModal').removeClass('is-active');
			window.location.href = '/';
		});
		//Comments modal
		$('.delete').click(function () {
			$('#commentsModal').removeClass('is-active');
			window.location.reload();
		});


	}

	document.addEventListener('DOMContentLoaded', pageReady);
})();