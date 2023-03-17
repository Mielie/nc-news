import CommentCard from "./CommentCard";

const CommentHistory = ({
	comments,
	authorAvatars,
	commentCount,
	setComments,
}) => {
	return comments.length === 0 ? (
		<h3 id="commentsTitle">No comments</h3>
	) : (
		<div>
			<h3 id="commentsTitle">Recent comments ({commentCount})</h3>
			{comments.map((comment) => (
				<CommentCard
					comment={comment}
					authorAvatars={authorAvatars}
					key={comment.created_at}
					setComments={setComments}
				/>
			))}
			<div id="bottomSpace"></div>
		</div>
	);
};

export default CommentHistory;
