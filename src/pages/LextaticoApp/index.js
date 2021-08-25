import { Fragment } from "react";
import { withRouter, Switch, useRouteMatch, Link, Route } from "react-router-dom"
import NotFound from "../NotFound";

const LextaticoApp = () => {
    const { path, url } = useRouteMatch();

    return (
        <Fragment>
            <ul>
                <li>
                    <Link to={`${url}`}>App</Link>
                </li>
                <li>
                    <Link to={`${url}/teste`}>App/teste</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path={path} component={() => <h1>App</h1>} />
                <Route exact path={`${path}/teste`} component={() => <h1>App/teste</h1>} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Fragment>
    );
}

export default withRouter(LextaticoApp);
