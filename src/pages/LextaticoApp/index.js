import { useContext } from "react";
import { withRouter, Switch, useRouteMatch, Route, Link as RouterLink, NavLink } from "react-router-dom"
import { Button, styled } from "@material-ui/core";
import { MyContext } from "../../App";
import Layout from "../../common/components/Layout"
import NotFound from "../NotFound";
import AccountService from "../../services/accountService";

const LextaticoApp = ({ location }) => {
    const { user, setAuthenticated, setUser } = useContext(MyContext);

    const { path, url } = useRouteMatch();

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


    const But = styled(Button)({
        // margin: "0px 10px 10px 0px", color: "#000", padding: "10px", borderRadius: "5px", textDecoration: "none", backgroundColor: "#ee3"
        // , "&:hover": {
        //     backgroundColor: "#f41 !important"
        // }
    });

    const But2 = styled(Button)({
        margin: "0px 10px 10px 0px", color: "#000", padding: "10px", borderRadius: "5px", textDecoration: "none", backgroundColor: "#ee3"
        , "&:hover": {
            backgroundColor: "#f41 !important"
        }
    })

    const handleLogout = () => {
        AccountService.logout(setUser);

        setAuthenticated(false);
    }

    return (
        <Layout>
            <h1>Usuario logado: {user.name}</h1>

            <div style={{ display: "flex" }}>
                {links.map((link, index) => (
                    <Button exact activeStyle={{ backgroundColor: "#4f5" }} key={index} component={NavLink} to={link.Route}>{link.Nome}</Button>
                ))}

                <But2 onClick={handleLogout}>Logout</But2>
            </div>

            <Switch>
                <Route exact path={path} component={() => <h1>App</h1>} />
                <Route exact path={`${path}/teste`} component={() => <h1>App/teste</h1>} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Layout>
    );
}

export default withRouter(LextaticoApp);
