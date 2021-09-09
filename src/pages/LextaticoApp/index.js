import { useContext, useEffect } from "react";
import { withRouter, Switch, useRouteMatch, Route, Redirect } from "react-router-dom"
import { MyContext } from "../../App";
import Layout from "../../common/components/Layout"

const LextaticoApp = () => {
    const { setTitleName } = useContext(MyContext);

    useEffect(() => {
        setTitleName("Analisadores");
    }, [setTitleName]);


    const { path } = useRouteMatch();

    return (
        <Layout>
            <Switch>
                <Route exact path={path} component={() => <h1>App</h1>} />
                <Redirect from="*" to="/404" />
            </Switch>
        </Layout>
    );
}

export default withRouter(LextaticoApp);
