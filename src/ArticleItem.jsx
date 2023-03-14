import { Link } from "react-router-dom";

const ArticleItem = ({ article, className }) => {
	return (
		<div className={`articleListItem ${className}`}>
			<img
				className="articleListItemImage"
				src={article.article_img_url}
				alt={`${article.title}`}
			/>
			<div className="articleTitleContainer">
				<Link
					className="articleTitle"
					path={`/articles/${article.article_id}`}
				>
					{article.title}
				</Link>
			</div>
			<div className="articleTopicContainer">
				<p className="articleTopic">{article.topic}</p>
			</div>
			<div className="articleAuthorContainer">
				<p className="articleAuthor">{article.author}</p>
			</div>
			<p className="articleVotes">{article.votes} likes</p>
			<p className="articleDate">{formatDate(article.created_at)}</p>
		</div>
	);
};

const formatDate = (string) => {
	let date = new Date(string);
	return date.toLocaleDateString();
};

export default ArticleItem;
