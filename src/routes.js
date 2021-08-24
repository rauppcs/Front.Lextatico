import React, { useEffect } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { isAuthenticated } from "./services/authService"
import Login from "./pages/LogIn"
import SignIn from "./pages/SignIn"
import { MyContext } from "./App"
import { useContext } from "react"
import { Home } from "./pages/Home"
import LextaticoApp from "./pages/LextaticoApp"
import Loading from "./components/Loading"

const PublicRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => <Component {...props} />}
		/>
	);
}

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { authenticationLoading, setAuthenticationLoading } = useContext(MyContext);

	useEffect(() => {
		async function auhenticated() {
			const authenticated = await isAuthenticated();

			setAuthenticationLoading({
				loading: false,
				authenticated
			});
		}

		auhenticated();
	}, [setAuthenticationLoading]);

	return (
		!authenticationLoading.loading ?
			<Route
				{...rest}
				render={props =>
					authenticationLoading.authenticated ? (
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
				<PublicRoute path="*" component={() => <h1>Page not found</h1>} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
