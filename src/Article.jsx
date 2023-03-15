import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate, wordCount } from "./utils";
import LoadingSpinner from "./LoadingSpinner";
import { getArticle, updateVoteForArticle } from "./apiFunctions";
import Comment from "./Comment";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

const Article = ({
	setArticleWordCount,
	setNumItems,
	setCommentPageNumber,
	commentPageNumber,
}) => {
	const { articleid } = useParams();
	const { user } = useContext(UserContext);
	const [article, setArticle] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [commentCount, setCommentCount] = useState(null);
	const [articleVotes, setArticleVotes] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		setNumItems(null);
		setCommentPageNumber(1);
		setArticleWordCount(null);
		getArticle(articleid).then((article) => {
			setArticle(article);
			setCommentCount(article.comment_count);
			setArticleVotes(article.votes);
			setArticleWordCount(wordCount(article.body));
			setIsLoading(false);
		});
	}, [articleid]);

	const adjustVote = (inc) => {
		setArticleVotes((currentVotes) => currentVotes + inc);
		updateVoteForArticle(articleid, inc).catch(() => {
			setArticleVotes((currentVotes) => currentVotes - inc);
		});
	};

	const isUserAuthor = () => article.author === user.username;

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
			<div id="articleViewVotes">{articleVotes} likes</div>
			<div id="articleViewVoteControls">
				{user ? (
					<div>
						<button
							className="voteButton"
							id="voteUp"
							disabled={isUserAuthor() ? true : false}
							onClick={() => adjustVote(1)}
						>
							ᐱ
						</button>
						<button
							className="voteButton"
							id="voteDown"
							disabled={isUserAuthor() ? true : false}
							onClick={() => adjustVote(-1)}
						>
							ᐯ
						</button>
					</div>
				) : null}
			</div>
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
