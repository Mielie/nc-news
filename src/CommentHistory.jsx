import CommentCard from "./CommentCard";

const CommentHistory = ({ comments, authorAvatars, commentCount }) => {
	return comments.length === 0 ? (
		<div id="commentsBox">
			<h3 id="commentsTitle">No comments</h3>
		</div>
	) : (
		<div id="commentsBox">
			<h3 id="commentsTitle">Recent comments ({commentCount})</h3>
			{comments.map((comment) => (
				<CommentCard
					comment={comment}
					authorAvatars={authorAvatars}
					key={comment.comment_id}
				/>
			))}
			<div id="bottomSpace"></div>
		</div>
	);
};

export default CommentHistory;
