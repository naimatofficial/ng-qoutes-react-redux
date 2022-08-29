import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

import useHttp from "../../hook/use-http";
import { getAllComments } from "../../lib/api";

const Comments = () => {
	const [isAddingComment, setIsAddingComment] = useState(false);
	const params = useParams();
	const { quoteId } = params; // object destructurize

	const { sendRequest, status, data: loadedComment } = useHttp(getAllComments);

	useEffect(() => {
		sendRequest(quoteId);
	}, [sendRequest, quoteId]);

	const startAddCommentHandler = () => {
		setIsAddingComment(true);
	};

	const addedCommentHanlder = useCallback(() => {
		sendRequest(quoteId);
	}, [sendRequest, quoteId]);

	let comment;

	if (status === "pending") {
		comment = (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (status === "completed" && loadedComment && loadedComment.length > 0) {
		comment = <CommentsList comments={loadedComment} />;
	}

	if (
		status === "completed" &&
		(!loadedComment || loadedComment.length === 0)
	) {
		comment = <p className="centered">No comments where added yet!</p>;
	}

	return (
		<section className={classes.comments}>
			<h2>User Comments</h2>
			{!isAddingComment && (
				<button className="btn" onClick={startAddCommentHandler}>
					Add a Comment
				</button>
			)}
			{isAddingComment && (
				<NewCommentForm
					quoteId={quoteId}
					onAddedComment={addedCommentHanlder}
				/>
			)}
			{comment}
		</section>
	);
};

export default Comments;
