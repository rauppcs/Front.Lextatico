import { useContext, useEffect } from "react";
import { withRouter, Switch, useRouteMatch, Route, Redirect } from "react-router-dom"
import { MyContext } from "../../App";
import Layout from "../../common/components/Layout"
import List from "./list"
import Create from "./create";

const Analyzer = () => {
    const { setTitleName } = useContext(MyContext);

    useEffect(() => {
        setTitleName("Analisadores");
    }, [setTitleName]);

    const { path } = useRouteMatch();

    return (
        <Layout>
            <Switch>
                <Route exact path={path} component={List} />
                <Route path={`${path}/cadastrar`} component={Create} />
                <Redirect from="*" to="/404" />
            </Switch>
        </Layout>
    );
}

export default withRouter(Analyzer);
