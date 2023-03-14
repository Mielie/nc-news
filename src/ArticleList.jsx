import { useState, useEffect } from "react";
import { getArticles } from "./apiFunctions";
import ArticleItem from "./ArticleItem";
import Footer from "./Footer";
import LoadingSpinner from "./LoadingSpinner";

const ArticleList = ({ setNumArticles, pageNumber }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		getArticles(pageNumber).then((articles) => {
			setNumArticles(articles.total_count);
			setArticles(articles.articles);
			setIsLoading(false);
		});
	}, [pageNumber]);

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
			<div id="bottomSpace"></div>
		</div>
	);
};

export default ArticleList;
