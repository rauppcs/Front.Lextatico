import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { isAuthenticated } from "./services/authService"
import Login from "./pages/LogIn"
import SignIn from "./pages/SignIn"
import { MyContext } from "./App"
import { useContext } from "react"
import { Home } from "./pages/Home"
import LextaticoApp from "./pages/LextaticoApp"
import Loading from "./common/components/Loading"
import NotFound from "./pages/NotFound"

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
				<Route exact path="/" component={Home} />
				<PublicRoute path="/login" component={Login} />
				<PublicRoute path="/SignIn" component={SignIn} />
				<PrivateRoute path="/app" component={LextaticoApp} />
				<PublicRoute path="*" component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
