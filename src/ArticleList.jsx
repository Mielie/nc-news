import { useState, useEffect } from "react";
import { getArticles } from "./apiFunctions";
import ArticleItem from "./ArticleItem";
import LoadingSpinner from "./LoadingSpinner";

const ArticleList = ({
	setNumItems,
	pageNumber,
	topicFilter,
	setTopicFilter,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		setNumItems(null);
		getArticles(pageNumber, topicFilter).then((articles) => {
			setNumItems(articles.total_count);
			setArticles(articles.articles);
			setIsLoading(false);
		});
	}, [pageNumber, topicFilter]);

	return (
		<div id="articleListBox">
			{isLoading ? (
				<div>
					<p id="articleLoadingText">Loading Articles</p>
					<LoadingSpinner />
				</div>
			) : (
				articles.map((article, index) => (
					<ArticleItem
						key={article.article_id}
						article={article}
						setTopicFilter={setTopicFilter}
						topicFilter={topicFilter}
						className={
							index % 2
								? "articleListDarkBackground"
								: "articleListLightBackground"
						}
					/>
				))
			)}
			<div id="bottomSpace"></div>
		</div>
	);
};

export default ArticleList;
