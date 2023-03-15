import { useContext, useState } from "react";
import { postNewCommentForArticle } from "./apiFunctions";
import { UserContext } from "./contexts/UserContext";

const NewComment = ({ setComments, articleid }) => {
	const { user } = useContext(UserContext);
	const [newCommentText, setNewCommentText] = useState("");

	const postNewComment = (event) => {
		event.preventDefault();
		const newComment = {
			votes: 0,
			author: user.username,
			body: newCommentText,
			created_at: new Date(),
			article_id: articleid,
		};
		setComments((currentComments) => [newComment, ...currentComments]);
		setNewCommentText("");
		postNewCommentForArticle(articleid, newComment).catch(() => {
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
			<form id="newCommentBox" onSubmit={postNewComment}>
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
