import React, { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";

import useHttp from "../hook/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
	const histroy = useHistory();
	const { sendRequest, status } = useHttp(addQuote);

	useEffect(() => {
		if (status === "completed") {
			histroy.push("/quotes");
		}
	}, [status, histroy]);

	const addQuoteHanlder = (quoteData) => {
		sendRequest(quoteData);
		// histroy.push("/quotes");
	};

	return (
		<section>
			<QuoteForm
				isLoading={status === "pending"}
				onAddQuote={addQuoteHanlder}
			/>
		</section>
	);
};

export default NewQuote;
