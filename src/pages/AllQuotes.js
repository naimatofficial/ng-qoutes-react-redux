import React, { useEffect } from "react";
import QouteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import useHttp from "../hook/use-http";
import { getAllQuotes } from "../lib/api";

const AddQuote = () => {
	const {
		sendRequest,
		status,
		data: loadedQuotes,
		error,
	} = useHttp(getAllQuotes, true);

	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

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

	if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
		return <NoQuotesFound />;
	}

	return <QouteList quotes={loadedQuotes} />;
};

export default AddQuote;
