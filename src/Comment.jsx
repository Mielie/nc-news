import { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import LoadingSpinner from "./LoadingSpinner";
import { getComments, getAuthorAvatar } from "./apiFunctions";
import CommentHistory from "./CommentHistory";
import NewComment from "./NewComment";

const Comment = ({
	articleid,
	commentCount,
	setNumItems,
	commentPageNumber,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState(null);
	const [authorAvatars, setAuthorAvatars] = useState({});
	const { user } = useContext(UserContext);

	useEffect(() => {
		setIsLoading(true);
		setNumItems(null);
		getComments(articleid, commentPageNumber).then((comments) => {
			setComments(comments);
			const authorList = [
				...new Set(comments.map((comment) => comment.author)),
			];
			const promises = [];
			authorList.forEach((author) =>
				promises.push(getAuthorAvatar(author))
			);
			Promise.all(promises).then((data) => {
				setAuthorAvatars(
					data.reduce(
						(authors, item) => {
							authors[item[0]] = item[1];
							return authors;
						},
						user ? { [user.username]: user.avatar_url } : {}
					)
				);
				setNumItems(commentCount);
				setIsLoading(false);
			});
		});
	}, [commentPageNumber]);

	return isLoading ? (
		<div id="commentsBox">
			<LoadingSpinner id="commentLoadingSpinner" />
		</div>
	) : (
		<div id="commentsBox">
			{user && (
				<NewComment setComments={setComments} articleid={articleid} />
			)}
			<CommentHistory
				comments={comments}
				commentCount={commentCount}
				authorAvatars={authorAvatars}
			/>
		</div>
	);
};

export default Comment;
