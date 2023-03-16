import { useContext, useState } from "react";
import { postNewCommentForArticle } from "./apiFunctions";
import { UserContext } from "./contexts/UserContext";

const NewComment = ({ setComments, articleid, setCommentCount }) => {
	const { user } = useContext(UserContext);
	const [displayError, setDisplayError] = useState(false);
	const [newCommentText, setNewCommentText] = useState("");

	const postNewComment = (event) => {
		setDisplayError(false);
		event.preventDefault();
		const newComment = {
			votes: 0,
			author: user.username,
			body: newCommentText,
			created_at: new Date(),
			article_id: articleid,
		};
		setComments((currentComments) => [newComment, ...currentComments]);
		setCommentCount((currentCount) => currentCount + 1);
		setNewCommentText("");
		postNewCommentForArticle(articleid, newComment).catch(() => {
			setDisplayError(true);
			setCommentCount((currentCount) => currentCount - 1);
			setComments((currentComments) => {
				return currentComments.filter(
					(comment) => comment !== newComment
				);
			});
		});
	};

	return (
		<div>
			<h3 id="commentsTitle">Post a new comment</h3>
			{displayError && (
				<p id="errorMessage">
					An error occurred when posting your comment
				</p>
			)}
			<form
				id={displayError ? "errorBox" : "newCommentBox"}
				onSubmit={postNewComment}
			>
				<textarea
					id="newCommentText"
					placeholder="new comment text..."
					required={true}
					value={newCommentText}
					onChange={(event) => setNewCommentText(event.target.value)}
				/>
				<button
					type="submit"
					id="postNewCommentButton"
					className="brandedButton"
				>
					Post
				</button>
			</form>
		</div>
	);
};

export default NewComment;
