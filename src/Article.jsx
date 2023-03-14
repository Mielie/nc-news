import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate, wordCount } from "./utils";
import LoadingSpinner from "./LoadingSpinner";
import { getArticle } from "./apiFunctions";
import Comment from "./Comment";

const Article = ({
	setArticleWordCount,
	setNumItems,
	setCommentPageNumber,
	commentPageNumber,
}) => {
	const { articleid } = useParams();
	const [article, setArticle] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [commentCount, setCommentCount] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		setNumItems(null);
		setCommentPageNumber(1);
		setArticleWordCount(null);
		getArticle(articleid).then((article) => {
			setArticle(article);
			setCommentCount(article.comment_count);
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
			<Comment
				articleid={articleid}
				commentCount={commentCount}
				setNumItems={setNumItems}
				commentPageNumber={commentPageNumber}
			/>
		</article>
	);
};

export default Article;
