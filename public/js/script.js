(function () {
	function scrapeArticles() {
		axios.get('/scrape')
			.then(function (response) {
				const modal = document.getElementById('resultsModal');
				const modalBody = modal.querySelector('.modal-body');

				if (response.status === 200) {

					modalBody.textContent = `${response.data.length} articles were added!`;
				}

			})
			.catch(function (error) {
				console.log('Looks like there was a problem: \n', error);
			});
	}

	function saveArticle() {

		const articleId = this.getAttribute('data-id');

		const data = {
			id: articleId
		};

		axios.post('/articles/save', data)
			.then(function (response) {
				console.log(response);
				if (response.status === 200) window.location.reload();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function unSaveArticle(event) {
		const articleId = this.getAttribute('data-id');

		const data = {
			id: articleId
		};

		axios.post('/articles/unsave', data)
			.then(function (response) {
				console.log(response);
				if (response.status === 200) window.location.reload();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	//Todo: Figure out a way to show comment immediately without reload
	function saveComment(event) {
		event.preventDefault();

		const articleId = this.getAttribute('data-article-id');
		const noteText = document.getElementById(`comment-textarea-${articleId}`).value;



		axios.post(`/articles/${articleId}/comments/new`)
			.then(function (response) {
				console.log(response);
				if (response.status === 200) {
					document.getElementById(`comment-textarea-${articleId}`).value('');
					//I'm doing this to make up for the fact that comments are displayed immediatly.
					document.getElementById(`commentCollapse-${articleId}`).collapse('hide');
					window.location.reload();
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function deleteComment() {
		const commentId = $(this).attr('delete-comment-id');
		$.ajax({
				url: `/comments/${commentId}/delete`,
				type: 'POST'
			})
			.done(function (comment, status, response) {
				$('#commentsModal').removeClass('is-active');
				window.location.href = '/saved';
			});
	}

	function pageReady() {
		// document.getElementById('scrape').onclick = scrapeArticles;
		$('#scrape').on('click', scrapeArticles);
		$('.save').on('click', saveArticle);
		$('.unsave').on('click', unSaveArticle);
		$('.delete').on('click', deleteComment);

		$('#close-results-modal').on('click', function () {
			window.location.href = '/';
		});


		$('.submit-comment').on('click', saveComment);

	}

	document.addEventListener('DOMContentLoaded', pageReady);
})();