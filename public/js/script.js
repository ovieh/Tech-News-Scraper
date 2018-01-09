//Todo(s)!
// Replace Bootstrap Collapse /jQuery Accordian with something else, maybe this https://github.com/cferdinandi/houdini/
// Replace Modal code with own

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

		axios.post(`/articles/${articleId}/comments/new`, { text: noteText })
			.then(function (response) {
				console.log(response);
				if (response.status === 200) {
					document.getElementById(`comment-textarea-${articleId}`).value = '';
					//I'm doing this to make up for the fact that comments are displayed immediatly.
					// const commentElem = document.getElementById(`commentCollapse-${articleId}`);
					// commentElem.collapse('hide');
					$(`#commentCollapse-${articleId}`).collapse('hide');

					// document.getElementById(`commentCollapse-${articleId}`).collapse('hide');
					// window.location.reload();
				}
			})
			// .then(window.location.reload())
			.catch(function (error) {
				console.log(error);
			});
	}

	function deleteComment() {
		const commentId = this.getAttribute('delete-comment-id');

		axios.post(`/comments/${commentId}/delete`)
			.then(function (response) {
				window.location.href = '/saved';
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}


	function pageReady() {
		document.getElementById('scrape').onclick = scrapeArticles;
		const saveElem =  document.getElementById('save');
		if(saveElem) saveElem.onclick = saveArticle;

		const unsaveElem =  document.getElementById('unsave');
		if(unsaveElem) unsaveElem.onclick = unSaveArticle;

		const deleteElem =  document.getElementById('delete');
		if(deleteElem) deleteElem.onclick = deleteComment;

		document.getElementById('submit-comment').onclick = saveComment;

		// $('.submit-comment').on('click', saveComment);

		//Refresh page on successful scrape

	}

	document.addEventListener('DOMContentLoaded', pageReady);
})();