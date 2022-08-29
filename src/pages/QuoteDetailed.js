import React, { Fragment, useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import useHttp from "../hook/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetailed = () => {
	const params = useParams();
	// const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
	const match = useRouteMatch();

	const {
		sendRequest,
		status,
		data: loadedQuote,
		error,
	} = useHttp(getSingleQuote, true);

	const { quoteId } = params;

	useEffect(() => {
		sendRequest(quoteId);
	}, [sendRequest, quoteId]);

	if (status === "pending") {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <div className="centered focus">{error}</div>;
	}

	if (!loadedQuote.text) {
		return <p>No quote are found!</p>;
	}

	return (
		<Fragment>
			<HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
			{/* when the load Comments btn is clicked the are disapear and show the comments commponent */}
			<Route path={match.path} exact>
				<div className="centered">
					<Link to={`${match.url}/comments`} className="btn--flat">
						Load Comments
					</Link>
				</div>
			</Route>
			{/* nested route for qoutes comments */}
			<Route path={`${match.path}/comments`}>
				<Comments />
			</Route>
		</Fragment>
	);
};

export default QuoteDetailed;
