import axios from "axios";

export function getArticles(pageNumber) {
	return axios
		.get("https://news-app-backend.onrender.com/api/articles", {
			params: { p: pageNumber - 1 },
		})
		.then(({ data }) => data);
}

export function getArticle(articleid) {
	return axios
		.get(`https://news-app-backend.onrender.com/api/articles/${articleid}`)
		.then(({ data: { article } }) => article);
}
