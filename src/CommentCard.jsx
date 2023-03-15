import { formatDate } from "./utils";
import { useContext, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { updateVoteForArticleComment } from "./apiFunctions";

const CommentCard = ({ comment, authorAvatars }) => {
	const { user } = useContext(UserContext);
	const [likes, setLikes] = useState(comment.votes);

	const adjustVote = (inc) => {
		setLikes((currentLikes) => currentLikes + inc);
		updateVoteForArticleComment(comment.comment_id, inc).catch(() => {
			setLikes((currentLikes) => currentLikes - inc);
		});
	};

	const userIsAuthor = () => user.username === comment.author;

	return (
		<div className="commentCard">
			<img
				src={authorAvatars[comment.author]}
				alt={comment.author}
				className="commentAvatar"
			/>
			<p className="commentAuthor">{comment.author}</p>

			{user ? (
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
			) : null}

			<p className="commentVotes">{likes} likes</p>
			<p className="commentBody">{comment.body}</p>
			<p className="commentDate">{formatDate(comment.created_at)}</p>
		</div>
	);
};

export default CommentCard;
