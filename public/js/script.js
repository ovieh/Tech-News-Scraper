(function () {
	function scrapeArticles() {
		$.get('/scrape')
			.done(function (data, status, response) {
				let modalBody = $('#resultsModal').find('.modal-body');

				if (response.status === 200) {

					modalBody.text(`${data.length} articles were added!`);
				}

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

	//Todo: Figure out a way to show comment immediately without reload
	function saveComment(event) {
		event.preventDefault();

		const articleId = $(this).attr('data-article-id');
		const noteText = $(`#comment-textarea-${articleId}`).val();

		$.ajax({
				method: 'POST',
				url: `/articles/${articleId}/comments/new`,
				data: {
					text: noteText
				}
			})
			.done(function (note, status, response) {
				if (response.status === 200) {
					$(`#comment-textarea-${articleId}`).val('');
					//I'm doing this to make up for the fact that comments are displayed immediatly.
					$(`#commentCollapse-${articleId}`).collapse('hide');
					window.location.reload();
				}
			})
			.fail(function (err) {
				console.log(err.status);
			});


	}

	function deleteComment() {
		const commentId = $(this).attr('delete-comment-id');
		$.ajax({
			url: `/comments/${commentId}/delete`,
			type: 'POST'
		})
		.done(function(comment, status, response){
			window.location.href = '/saved';
		});
	}

	function pageReady() {
		// document.getElementById('scrape').onclick = scrapeArticles;
		$('#scrape').on('click', scrapeArticles);
		$('.save').on('click', saveArticle);
		$('.unsave').on('click', unSaveArticle);
		$('.delete').on('click', deleteComment);
		$('.submit-comment').on('click', saveComment);
	}

	document.addEventListener('DOMContentLoaded', pageReady);
})();