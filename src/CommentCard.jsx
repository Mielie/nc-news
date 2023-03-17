import { formatDate } from "./utils";
import { useContext, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import {
	updateVoteForArticleComment,
	deleteCommentWithId,
} from "./apiFunctions";

const CommentCard = ({
	comment,
	authorAvatars,
	setComments,
	toBeDeleted,
	setMarkedForDeletion,
}) => {
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

	const confirmRemoval = () => {
		if (toBeDeleted) {
			setMarkedForDeletion(null);
		} else {
			setMarkedForDeletion(comment.comment_id);
		}
	};

	const removeComment = () => {
		setMarkedForDeletion(null);
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
				comment.error = "Message deletion failed";
				newComments.splice(commentIndex, 0, comment);
				return newComments;
			});
		});
	};

	return (
		<div
			className={
				toBeDeleted || comment.error
					? "commentCardDelete"
					: "commentCard"
			}
		>
			<img
				src={authorAvatars[comment.author]}
				alt={comment.author}
				className="commentAvatar"
			/>
			{comment.error ? (
				<p className="commentDeleteFailLabel">
					Message failed to delete
				</p>
			) : (
				<p className="commentAuthor">{comment.author}</p>
			)}

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
						className={`brandedButton ${
							toBeDeleted ? "cancelRemoveButton" : "removeButton"
						}`}
						onClick={confirmRemoval}
					>
						{toBeDeleted ? "Cancel" : "Delete"}
					</button>
				</div>
			)}
			{toBeDeleted ? (
				<button
					className="brandedButton removeButton"
					onClick={removeComment}
				>
					Delete
				</button>
			) : (
				<p className="commentVotes">{likes} likes</p>
			)}
			<p className="commentBody">{comment.body}</p>
			<p className="commentDate">{formatDate(comment.created_at)}</p>
		</div>
	);
};

export default CommentCard;
