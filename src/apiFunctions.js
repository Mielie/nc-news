import axios from "axios";

export function getArticles(pageNumber, topic, author, sort_col, sort_dir) {
	const dir = sort_dir ? "asc" : "desc";
	return axios
		.get("https://news-app-backend.onrender.com/api/articles", {
			params: {
				p: pageNumber - 1,
				topic,
				author,
				sort_by: sort_col,
				order: dir,
			},
		})
		.then(({ data }) => data);
}

export function getArticle(articleid) {
	return axios
		.get(`https://news-app-backend.onrender.com/api/articles/${articleid}`)
		.then(({ data: { article } }) => article);
}

export function getComments(articleid, pageNumber) {
	return axios
		.get(
			`https://news-app-backend.onrender.com/api/articles/${articleid}/comments`,
			{
				params: { p: pageNumber - 1 },
			}
		)
		.then(({ data: { comments } }) => comments);
}

export function getAuthorAvatar(author) {
	return axios
		.get(`https://news-app-backend.onrender.com/api/users/${author}`)
		.then(({ data: { user } }) => [author, user.avatar_url]);
}

export function updateVoteForArticle(articleid, inc) {
	return axios.patch(
		`https://news-app-backend.onrender.com/api/articles/${articleid}`,
		{ inc_votes: inc }
	);
}

export function updateVoteForArticleComment(commentid, inc) {
	return axios.patch(
		`https://news-app-backend.onrender.com/api/comments/${commentid}`,
		{ inc_votes: inc }
	);
}

export function getUsers() {
	return axios
		.get("https://news-app-backend.onrender.com/api/users")
		.then(({ data: { users } }) => users);
}

export function postNewCommentForArticle(articleid, comment) {
	const newComment = {
		author: comment.author,
		body: comment.body,
		votes: comment.votes,
	};
	return axios.post(
		`https://news-app-backend.onrender.com/api/articles/${articleid}/comments`,
		newComment
	);
}

export function getTopicList() {
	return axios
		.get(`https://news-app-backend.onrender.com/api/topics`)
		.then(({ data: { topics } }) => topics);
}
