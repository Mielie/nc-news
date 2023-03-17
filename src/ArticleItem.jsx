import { Link, useSearchParams } from "react-router-dom";
import { formatDate, capitaliseFirstLetter } from "./utils";

const ArticleItem = ({ article, className }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const newParams = Object.fromEntries([...searchParams]);

	const filterTopic = (event) => {
		event.preventDefault();
		newParams.topic = article.topic;
		setSearchParams(newParams);
	};

	const filterAuthor = (event) => {
		event.preventDefault();
		newParams.author = article.author;
		setSearchParams(newParams);
	};

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
				{newParams.topic ? (
					<p className="articleTopic">
						{capitaliseFirstLetter(article.topic)}
					</p>
				) : (
					<button onClick={filterTopic} className="topicButton">
						{capitaliseFirstLetter(article.topic)}
					</button>
				)}
			</div>
			<div className="articleAuthorContainer">
				{newParams.author ? (
					<p className="articleAuthor">{article.author}</p>
				) : (
					<button onClick={filterAuthor} className="topicButton">
						{article.author}
					</button>
				)}
			</div>
			<p className="articleVotes">{article.votes} likes</p>
			<p className="articleDate">{formatDate(article.created_at)}</p>
		</Link>
	);
};

export default ArticleItem;
