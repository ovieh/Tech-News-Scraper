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
	//Vestigial code
	function showComments() {
		const articleId = $(event.target).attr('data-id');
		const headline = $(event.target).attr('data-headline');

		let modalTitle = $('#commentsModal').find('.modal-card-body');
		modalTitle.attr('data-id', articleId);

		modalTitle.prepend(headline);


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
		$('.comments').on('click', showComments);
		$('.delete').on('click', deleteComment);

		$('#close-results-modal').on('click', function () {
			window.location.href = '/';
		});


		$('.submit-comment').on('click', saveComment);

	}

	document.addEventListener('DOMContentLoaded', pageReady);
})();