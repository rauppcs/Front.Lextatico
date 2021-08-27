import { withRouter, Switch, useRouteMatch, Route, Redirect } from "react-router-dom"
import Layout from "../../common/components/Layout"

const LextaticoApp = () => {
    const { path } = useRouteMatch();

    return (
        <Layout>
            <Switch>
                <Route exact path={path} component={() => <h1>App</h1>} />
                <Route exact path={`${path}/teste`} component={() => <h1>App/teste</h1>} />
                <Redirect from="*" to="/404" />
            </Switch>
        </Layout>
    );
}

export default withRouter(LextaticoApp);
