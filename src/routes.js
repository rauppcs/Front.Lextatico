import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { isAuthenticated } from "./services/authService"
import Login from "./pages/LogIn"
import SignIn from "./pages/SignIn"
import { MyContext } from "./App"
import { useContext } from "react"
import LextaticoApp from "./pages/LextaticoApp"
import Loading from "./common/components/Loading"
import NotFound from "./pages/NotFound"
import Layout from "./common/components/Layout"

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
			: <Loading />
	);
}

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute path="/analisadores" component={LextaticoApp} />
				<PublicRoute path="/login" component={Login} />
				<PublicRoute path="/SignIn" component={SignIn} />
				<PublicRoute path="/404" component={NotFound} />
				<Redirect exact from="/" to="/analisadores" />
				<Redirect from="*" to="/404" />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
