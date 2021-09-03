import React, { useContext, useState } from "react"
import SwipeableViews from "react-swipeable-views"
import { Link as RouterLink, withRouter } from "react-router-dom"
import { Grid, Link, makeStyles, Typography } from "@material-ui/core"
import { LextaticoBoxError } from "../../styles/common"
import { LextaticoTextField, LextaticoBox, LextaticoForm, LextaticoFormContentCenter, LextaticoFormContentLeft, LextaticoButton, LextaticoHr, LextaticoImg } from "./styles"
import Logo from "../../assets/Logo.png"
import AccountService from "../../services/accountService"
import CircularProgress from '@material-ui/core/CircularProgress'

import { MyContext } from "../../App";

const useStyles = makeStyles({
    gridCenter: {
        display: "flex",
        justifyContent: "center"
    },
    link: {
        cursor: "pointer"
    }
});

const LextaticoLink = (props) => {
    return <Link {...props} component={RouterLink}>{props.children}</Link>
}

const FormUser = ({ formUser, setFormUser, handleSubmit, isOk, loading, forgotNextHandleClick }) => {
    const styles = useStyles();

    return (
        <LextaticoFormContentCenter>
            <LextaticoImg src={Logo} alt="Lextatico logo" />
            <Typography style={{ width: "100%" }} variant="h5" paragraph component="h1">Faça o login.</Typography>
            {formUser.errors.length > 0 && <LextaticoBoxError>{formUser.errors.map(error => <span>* {error}</span>)}</LextaticoBoxError>}
            <LextaticoTextField
                type="email"
                label="Endereço de e-mail"
                variant="outlined"
                value={formUser.email.value}
                error={formUser.email.error !== ""}
                helperText={formUser.email.error}
                onChange={e => setFormUser((prev) => ({ ...prev, email: { value: e.target.value, error: "" } }))}
            />
            <LextaticoTextField
                type="password"
                label="Senha"
                variant="outlined"
                value={formUser.password.value}
                error={formUser.password.error !== ""}
                helperText={formUser.password.error}
                onKeyDown={e => e.key === "Enter" && isOk ? handleSubmit(e) : null}
                onChange={e => setFormUser((prev) => ({ ...prev, password: { value: e.target.value, error: "" } }))}
            />
            <LextaticoButton onClick={handleSubmit} disabled={!isOk} type="submit">{!loading
                ? "Entrar"
                : <CircularProgress size={30} color={"white"} />}
            </LextaticoButton>
            <LextaticoHr />
            <Grid direction="row" container>
                <Grid xs={5} sm={5} className={styles.gridCenter} item>
                    <Typography onClick={forgotNextHandleClick} className={styles.link} component={Link}>Esqueceu a senha?</Typography>
                </Grid>
                <Grid xs={2} sm={2} className={styles.gridCenter} item>
                    <span>.</span>
                </Grid>
                <Grid xs={5} sm={5} className={styles.gridCenter} item>
                    <Typography component={LextaticoLink} to="/signin">Cadastrar-se</Typography>
                </Grid>
            </Grid>
        </LextaticoFormContentCenter>
    );
}

const ForgotPassword = ({ loading, forgotHandleClick, forgotBackHandleClick, formUser, setFormUser, isOkForgotPassword }) => {
    const styles = useStyles();

    return (
        <LextaticoFormContentLeft>
            <Typography style={{ width: "100%" }} variant="h5" paragraph component="h1">Recuperar a senha.</Typography>
            <LextaticoTextField
                type="email"
                label="Endereço de e-mail"
                variant="outlined"
                value={formUser.email.value}
                error={formUser.email.error !== ""}
                helperText={formUser.email.error}
                onChange={e => setFormUser((prev) => ({ ...prev, email: { value: e.target.value, error: "" } }))}
            />
            <LextaticoButton onClick={forgotHandleClick} disabled={!isOkForgotPassword} type="submit">{!loading
                ? "Recuperar"
                : <CircularProgress size={30} color={"white"} />}
            </LextaticoButton>
            <LextaticoHr />
            <Typography style={{ width: "100%", display: "flex", justifyContent: "center" }} className={styles.link} component={Link} onClick={forgotBackHandleClick}>Voltar para login</Typography>
        </LextaticoFormContentLeft>
    )
}

const SwipeableForm = (props) => {
    const { setSnackBar } = useContext(MyContext);

    const [activeStepe, setActiveStep] = useState(0);

    const [loading, setLoading] = useState(false);

    const isOkForgotPassword = props.formUser.email.value !== "" && !loading;

    const forgotNextHandleClick = () => {
        setActiveStep(1);
    }

    const forgotBackHandleClick = () => {
        setActiveStep(0);
    }

    const forgotHandleClick = () => {
        try {
            setLoading(true);
            
            setTimeout(() => {
                setSnackBar((prev) => ({ ...prev, open: true, severity: "success", message: "Email enviado." }));
                setLoading(false);
                forgotBackHandleClick();
            }, 3000);
            
        } catch (error) {
            setSnackBar((prev) => ({ ...prev, open: true, severity: "error", message: error.response.data.errors.map(({ message }) => `${message}\n`) }));
        }
    }

    return (
        <LextaticoBox>
            <LextaticoForm>
                <SwipeableViews index={activeStepe}>
                    <FormUser {...props} forgotNextHandleClick={forgotNextHandleClick} />
                    <ForgotPassword {...props} loading={loading} forgotHandleClick={forgotHandleClick} isOkForgotPassword={isOkForgotPassword} forgotBackHandleClick={forgotBackHandleClick} />
                </SwipeableViews>
            </LextaticoForm>

        </LextaticoBox>
    );
}

const Login = (props) => {
    const { setSnackBar, setUser, setTitleName } = useContext(MyContext);

    setTitleName("Login");

    const [loading, setLoading] = useState(false);

    const [formUser, setFormUser] = useState({
        errors: [],
        email: {
            value: "",
            error: ""
        },
        password: {
            value: "",
            error: ""
        }
    });

    const isOk = formUser.email.value !== "" && formUser.password.value !== "" && !loading;


    const handleSubmit = async e => {
        try {
            setLoading(true);

            formUser.errors = [];
            setFormUser((prev) => ({ ...prev, formUser }))

            const user = {
                email: formUser.email.value,
                password: formUser.password.value
            };

            const { data } = await AccountService.login(user, setUser);

            if (data.errors.length === 0) {
                props.history.push("/");
            }
            else {
                data.errors.forEach(({ property, message }) => {
                    if (property !== "")
                        formUser[property].error = message;
                    else {
                        formUser.errors.push(message)
                    }
                });

                setFormUser((prev) => ({ ...prev, formUser }));
            }
        } catch (error) {
            setSnackBar((prev) => ({ ...prev, open: true, severity: "error", message: error.response.data.errors.map(({ message }) => `${message}\n`) }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <SwipeableForm formUser={formUser} setFormUser={setFormUser} handleSubmit={handleSubmit} isOk={isOk} loading={loading} />
    );
}

export default withRouter(Login);
