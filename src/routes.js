import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Login from "./pages/logIn"
import SignIn from "./pages/signIn"
import AuthContext from "./contexts/auth";
import { useContext } from "react"
import Analyzer from "./pages/analyzer"
import NotFound from "./pages/notFound"
import ResetPassword from "./pages/resetPassword"
import { validToken } from "./services/authService";
import { CircularLoading } from "./common/components/loading";
import WithAxios from "./common/components/withAxios";

export const PublicRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => <Component {...props} />}
		/>
	);
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = useContext(AuthContext);

	const [loading, setLoading] = useState(true);

	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		(async function () {
			const validated = await validToken();

			setAuthenticated(validated && isAuthenticated);

			setLoading(false);
		})();
	});

	return (
		!loading ?
			<Route
				{...rest}
				render={props =>
					authenticated ? (
						<Component {...props} />
					) : (
						<Redirect to={{ pathname: "/login", search: `?returnUrl=${props.location.pathname}`, state: { from: props.location } }} />
					)
				}
			/>
			: <CircularLoading />
	);
}

const Routes = () => {
	return (
		<BrowserRouter>
			<WithAxios>
				<Switch>
					<PrivateRoute path="/analisadores" component={Analyzer} />
					<PublicRoute exact path="/login" component={Login} />
					<PublicRoute exact path="/signIn" component={SignIn} />
					<PublicRoute exact path="/resetPassword" component={ResetPassword} />
					<Redirect exact from="/" to="/analisadores" />
					<PublicRoute path="/404" component={NotFound} />
					<Redirect path="*" to={"/404"} />
				</Switch>
			</WithAxios>
		</BrowserRouter>
	);
}

export default Routes;
