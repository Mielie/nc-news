import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDate, wordCount } from "./utils";
import LoadingSpinner from "./LoadingSpinner";
import { getArticle } from "./apiFunctions";

const Article = ({ setArticleWordCount }) => {
	const { articleid } = useParams();
	const [article, setArticle] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		setArticleWordCount(null);
		getArticle(articleid).then((article) => {
			setArticle(article);
			setArticleWordCount(wordCount(article.body));
			setIsLoading(false);
		});
	}, [articleid]);

	return isLoading ? (
		<div>
			<p id="articleLoadingText">Loading Article</p>
			<LoadingSpinner />
		</div>
	) : (
		<article id="articleView">
			<img
				id="articleViewImage"
				src={article.article_img_url}
				alt={article.title}
			/>
			<h2 id="articleViewTitle">{article.title}</h2>
			<p id="articleViewAuthor">{article.author}</p>
			<p id="articleViewDate">{formatDate(article.created_at)}</p>
			<p id="articleViewBody">{article.body}</p>
		</article>
	);
};

export default Article;
