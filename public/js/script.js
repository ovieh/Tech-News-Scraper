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
		const articleId = $(event.target).attr('data-id');
		const headline = $(event.target).attr('data-headline');

		let modalTitle = $('#commentsModal').find('.modal-card-body');
		modalTitle.attr('data-id', articleId);

		modalTitle.prepend(headline);

		$('#commentsModal').addClass('is-active');

	}

	function saveComment() {
		event.preventDefault();

		const articleId = $('#article-title').data('id');
		const noteText = $('#note-text-area').val();


		$.ajax({
				method: 'POST',
				url: `/articles/${articleId}/comments/new`,
				data: {
					text: noteText
				}
			})
			.done(function (note, status, response) {
				if (response.status === 200) {
					$('#note-text-area').val('');
				}
			})
			.fail(function (err) {
				console.log(err);
			});


	}

	function deleteComment() {
		const commentId = $(event.target).attr('data-id');

		$.ajax({
			url: `/comments/${commentId}/delete`,
			type: 'POST'
		})
		.done(function(comment, status, response){
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
		$('#delete-comment').on('click', deleteComment);

		//Results modal
		$('#scrape-modal').click(function () {
			$('#resultsModal').removeClass('is-active');
			window.location.href = '/';
		});
		//Comments modal
		$('#close-comments-modal').click(function () {
			$('#commentsModal').removeClass('is-active');
			window.location.reload();
		});

		$('#submit-note').on('click', saveComment);

	}

	document.addEventListener('DOMContentLoaded', pageReady);
})();