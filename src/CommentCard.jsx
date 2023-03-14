import { formatDate } from "./utils";

const CommentCard = ({ comment, authorAvatars }) => {
	return (
		<div className="commentCard">
			<img
				src={authorAvatars[comment.author]}
				alt={comment.author}
				className="commentAvatar"
			/>
			<p className="commentAuthor">{comment.author}</p>
			<p className="commentVotes">{comment.votes} likes</p>
			<p className="commentBody">{comment.body}</p>
			<p className="commentDate">{formatDate(comment.created_at)}</p>
		</div>
	);
};

export default CommentCard;
