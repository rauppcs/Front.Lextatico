import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/authService";
import LogIn from "./pages/LogIn";

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
			)
		}
	/>
);

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={() => <h1>Home</h1>} />
			<Route path="/login" component={LogIn} />
			<Route path="/SignIn" component={() => <h1>SignIn</h1>} />
			<PrivateRoute path="/app" component={() => <h1>App</h1>} />
			<Route path="*" component={() => <h1>Page not found</h1>} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
