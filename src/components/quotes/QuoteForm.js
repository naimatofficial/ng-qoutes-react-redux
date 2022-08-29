import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
	const authorInputRef = useRef();
	const textInputRef = useRef();
	const [isEntering, setIsEntering] = useState(false);

	const submitFormHandler = (event) => {
		event.preventDefault();

		const enteredAuthor = authorInputRef.current.value;
		const enteredText = textInputRef.current.value;

		// optional: Could validate here

		props.onAddQuote({ author: enteredAuthor, text: enteredText });
	};

	const formFocusHanlder = () => {
		setIsEntering(true);
	};

	const completeFormHanlder = () => {
		setIsEntering(false);
	};

	return (
		<Fragment>
			{/* warning when you leave the from without completed it! */}
			<Prompt
				when={isEntering}
				message={(location) =>
					"Are you sure want to leave? All your entered data will be lost! "
				}
			/>
			{/* card form here */}
			<Card>
				<form
					className={classes.form}
					onSubmit={submitFormHandler}
					onFocus={formFocusHanlder}
				>
					{props.isLoading && (
						<div className={classes.loading}>
							<LoadingSpinner />
						</div>
					)}

					<div className={classes.control}>
						<label htmlFor="author">Author</label>
						<input type="text" id="author" ref={authorInputRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor="text">Text</label>
						<textarea id="text" rows="5" ref={textInputRef}></textarea>
					</div>
					<div className={classes.actions}>
						<button className="btn" onClick={completeFormHanlder}>
							Add Quote
						</button>
					</div>
				</form>
			</Card>
		</Fragment>
	);
};

export default QuoteForm;
