import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { isAuthenticated } from "./services/authService"
import Login from "./pages/logIn"
import SignIn from "./pages/signIn"
import { MyContext } from "./App"
import { useContext } from "react"
import Analyzer from "./pages/analyzer"
import { CircularLoading } from "./common/components/loading"
import NotFound from "./pages/notFound"
import ResetPassword from "./pages/resetPassword"

const PublicRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => <Component {...props} />}
		/>
	);
}

const PrivateRoute = ({ component: Component, ...rest }) => {
	const [loading, setLoading] = useState(true);
	const { authenticated, setAuthenticated } = useContext(MyContext);

	useEffect(() => {
		(async function () {
			const authenticated = await isAuthenticated();

			setAuthenticated(authenticated);

			setLoading(false);
		})();
	}, [setAuthenticated]);

	return (
		!loading ?
			<Route
				{...rest}
				render={props =>
					authenticated ? (
						<Component {...props} />
					) : (
						<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
					)
				}
			/>
			: <CircularLoading />
	);
}

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute path="/analisadores" component={Analyzer} />
				<PublicRoute path="/login" component={Login} />
				<PublicRoute path="/signIn" component={SignIn} />
				<PublicRoute path="/resetPassword" component={ResetPassword} />
				<Redirect exact from="/" to="/analisadores" />
				<PublicRoute path="*" component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
