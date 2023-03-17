import { formatDate } from "./utils";
import { useContext, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import {
	updateVoteForArticleComment,
	deleteCommentWithId,
} from "./apiFunctions";

const CommentCard = ({ comment, authorAvatars, setComments }) => {
	const { user } = useContext(UserContext);
	const [likes, setLikes] = useState(comment.votes);

	const userIsAuthor = () => user.username === comment.author;
	const showVoteButtons = user && !userIsAuthor();
	const showDeleteButton = user && userIsAuthor();

	const adjustVote = (inc) => {
		setLikes((currentLikes) => currentLikes + inc);
		updateVoteForArticleComment(comment.comment_id, inc).catch(() => {
			setLikes((currentLikes) => currentLikes - inc);
		});
	};

	const removeComment = (event) => {
		if (window.confirm("Permanently remove comment?")) {
			let commentIndex = 0;
			setComments((currentComments) => {
				return currentComments.filter((item, index) => {
					if (item.comment_id === comment.comment_id) {
						commentIndex = index;
						return false;
					}
					return true;
				});
			});
			deleteCommentWithId(comment.comment_id).catch(() => {
				setComments((currentComments) => {
					const newComments = [...currentComments];
					newComments.splice(commentIndex, 0, comment);
					return newComments;
				});
			});
		}
	};

	return (
		<div className="commentCard">
			<img
				src={authorAvatars[comment.author]}
				alt={comment.author}
				className="commentAvatar"
			/>
			<p className="commentAuthor">{comment.author}</p>

			{showVoteButtons && (
				<div className="commentVoteControls">
					<button
						className="voteButton"
						id="voteUp"
						disabled={userIsAuthor() ? true : false}
						onClick={() => adjustVote(1)}
					>
						ᐱ
					</button>
					<button
						className="voteButton"
						id="voteDown"
						disabled={userIsAuthor() ? true : false}
						onClick={() => adjustVote(-1)}
					>
						ᐯ
					</button>
				</div>
			)}
			{showDeleteButton && (
				<div className="commentVoteControls">
					<button
						className="brandedButton removeButton"
						onClick={removeComment}
					>
						Delete
					</button>
				</div>
			)}
			<p className="commentVotes">{likes} likes</p>
			<p className="commentBody">{comment.body}</p>
			<p className="commentDate">{formatDate(comment.created_at)}</p>
		</div>
	);
};

export default CommentCard;
