import { Link } from "react-router-dom";
import { formatDate } from "./utils";

const ArticleItem = ({ article, className, topicFilter, setTopicFilter }) => {
	return (
		<Link
			className={`articleListItem ${className}`}
			to={`/articles/${article.article_id}`}
		>
			<img
				className="articleListItemImage"
				src={article.article_img_url}
				alt={article.title}
			/>
			<div className="articleTitleContainer">
				<h2 className="articleTitle">{article.title}</h2>
			</div>
			<div className="articleTopicContainer">
				{topicFilter ? (
					<p className="articleTopic">{article.topic}</p>
				) : (
					<button
						onClick={(event) => {
							event.preventDefault();
							setTopicFilter(article.topic);
						}}
						className="topicButton"
					>
						{article.topic}
					</button>
				)}
			</div>
			<div className="articleAuthorContainer">
				<p className="articleAuthor">{article.author}</p>
			</div>
			<p className="articleVotes">{article.votes} likes</p>
			<p className="articleDate">{formatDate(article.created_at)}</p>
		</Link>
	);
};

export default ArticleItem;
