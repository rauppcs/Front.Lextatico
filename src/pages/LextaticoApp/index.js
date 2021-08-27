import { useContext } from "react";
import { withRouter, Switch, useRouteMatch, Route, Redirect } from "react-router-dom"
import { MyContext } from "../../App";
import Layout from "../../common/components/Layout"
import NotFound from "../NotFound";
import AccountService from "../../services/accountService";

const LextaticoApp = () => {
    const { user, setAuthenticated, setUser } = useContext(MyContext);

    const { path } = useRouteMatch();

    const links = [
        {
            Nome: "App",
            Route: "/app"
        },
        {
            Nome: "App/Teste",
            Route: "/app/teste"
        }
    ];

    const handleLogout = () => {
        AccountService.logout(setUser);

        setAuthenticated(false);
    }

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
