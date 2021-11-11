import { withRouter, Switch, useRouteMatch, Route, Redirect } from "react-router-dom"
import Layout from "../../common/components/layout"
import List from "./list"
import Create from "./create";
import Edit from "./edit";
import Test from "./test";

const Analyzer = () => {
    const { path } = useRouteMatch();

    return (
        <Layout>
            <Switch>
                <Route exact path={path} component={List} />
                <Route path={`${path}/cadastrar`} component={Create} />
                <Route path={`${path}/editar/:id`} component={Edit} />
                <Route path={`${path}/testar/:id`} component={Test} />
                <Redirect from="*" to="/404" />
            </Switch>
        </Layout>
    );
}

export default withRouter(Analyzer);
