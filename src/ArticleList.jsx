import { useState, useEffect } from "react";
import { getArticles } from "./apiFunctions";
import ArticleItem from "./ArticleItem";
import LoadingSpinner from "./LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { capitaliseFirstLetter } from "./utils";

const ArticleList = ({ setNumItems, pageNumber }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [articles, setArticles] = useState([]);
	const [noArticlesFound, setNoArticlesFound] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setIsLoading(true);
		setNumItems(null);
		const sortBy = searchParams.get("sort_by");
		const order = searchParams.get("order");
		const authorFilter = searchParams.get("author");
		const topicFilter = searchParams.get("topic");
		getArticles(pageNumber, topicFilter, authorFilter, sortBy, order)
			.then((articles) => {
				setNumItems(articles.total_count);
				setArticles(articles.articles);
				setNoArticlesFound(null);
				setIsLoading(false);
			})
			.catch((error) => {
				setNumItems(0);
				setNoArticlesFound(error.response.data.msg);
				setArticles([]);
				setIsLoading(false);
			});
	}, [pageNumber, searchParams]);

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
						className={
							index % 2
								? "articleListDarkBackground"
								: "articleListLightBackground"
						}
					/>
				))
			)}
			{!isLoading && noArticlesFound && (
				<p id="articleLoadingText">
					{capitaliseFirstLetter(noArticlesFound)}
				</p>
			)}
			<div id="bottomSpace"></div>
		</div>
	);
};

export default ArticleList;
