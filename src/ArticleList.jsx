import { useState, useEffect } from "react";
import axios from "axios";
import ArticleItem from "./ArticleItem";
import Footer from "./Footer";

const ArticleList = ({ setNumArticles, pageNumber }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get("https://news-app-backend.onrender.com/api/articles", {
				params: { p: pageNumber - 1 },
			})
			.then(({ data }) => {
				setNumArticles(data.total_count);
				setArticles(data.articles);
				setIsLoading(false);
			});
	}, [pageNumber]);

	return (
		<div id="articleListBox">
			{isLoading ? (
				<p> Loading articles </p>
			) : (
				articles.map((article) => {
					return (
						<ArticleItem
							key={article.article_id}
							article={article}
						/>
					);
				})
			)}
			<div id="bottomSpace"></div>
		</div>
	);
};

export default ArticleList;
