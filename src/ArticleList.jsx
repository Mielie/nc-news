import { useState, useEffect } from "react";
import { getArticles } from "./apiFunctions";
import ArticleItem from "./ArticleItem";
import LoadingSpinner from "./LoadingSpinner";
import { useSearchParams } from "react-router-dom";

const ArticleList = ({
	setNumItems,
	pageNumber,
	topicFilter,
	setTopicFilter,
	authorFilter,
	setAuthorFilter,
	setAuthorValue,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [articles, setArticles] = useState([]);
	const [noArticlesFound, setNoArticlesFound] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get("sort_by");
	const order = searchParams.get("order");

	useEffect(() => {
		setIsLoading(true);
		setNumItems(null);
		getArticles(pageNumber, topicFilter, authorFilter, sortBy, order)
			.then((articles) => {
				setNumItems(articles.total_count);
				setArticles(articles.articles);
				setNoArticlesFound(false);
				setIsLoading(false);
			})
			.catch((error) => {
				if (error.response.data.msg === "author not found") {
					setNumItems(0);
					setNoArticlesFound(true);
					setArticles([]);
					setIsLoading(false);
				}
			});
	}, [pageNumber, topicFilter, authorFilter, sortBy, order]);

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
						authorFilter={authorFilter}
						setAuthorFilter={setAuthorFilter}
						setAuthorValue={setAuthorValue}
						className={
							index % 2
								? "articleListDarkBackground"
								: "articleListLightBackground"
						}
					/>
				))
			)}
			{!isLoading && noArticlesFound && (
				<p id="articleLoadingText">No articles found!</p>
			)}
			<div id="bottomSpace"></div>
		</div>
	);
};

export default ArticleList;
