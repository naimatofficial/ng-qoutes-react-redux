import { Route, Switch, Redirect } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetailed from "./pages/QuoteDetailed";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

const App = () => {
	return (
		<Layout>
			<Switch>
				<Route path={"/"} exact>
					<Redirect to="/quotes" />
				</Route>
				<Route path={"/quotes"} exact>
					<AllQuotes />
				</Route>
				<Route path={"/quotes/:quoteId"}>
					<QuoteDetailed />
				</Route>
				<Route path={"/new-quote"}>
					<NewQuote />
				</Route>
				<Route path={"*"}>
					<NotFound />
				</Route>
			</Switch>
		</Layout>
	);
};

export default App;
