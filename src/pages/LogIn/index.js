import React, { useContext, useState } from "react"
import SwipeableViews from "react-swipeable-views"
import { Link as RouterLink, withRouter } from "react-router-dom"
import { Grid, Link } from "@material-ui/core";
import { LextaticoBoxError } from "../../styles/common"
import { LextaticoTextField, LextaticoBox, LextaticoForm, LextaticoFormContentCenter, LextaticoFormContentLeft, LextaticoButton, LextaticoBackButton, LextaticoHr, LextaticoImg } from "./styles"
import Logo from "../../assets/Logo.png"
import AccountService from "../../services/accountService"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { MyContext } from "../../App";

const FormUser = ({ formUser, setFormUser, handleSubmit, isOk, loading, forgotHandleClick }) => {
    const styles = {
        gridCenter: {
            display: "flex",
            justifyContent: "center"
        },
        link: {
            cursor: "pointer"
        }
    };

    return (
        <LextaticoFormContentCenter>
            <LextaticoImg src={Logo} alt="Lextatico logo" />
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
                : <FontAwesomeIcon color="#fff" size="2x" icon={faSpinner} spin />}
            </LextaticoButton>
            <LextaticoHr />
            <Grid direction="row" container>
                <Grid xs={5} sm={5} style={styles.gridCenter} item>
                    <Link onClick={forgotHandleClick} style={styles.link}>Esqueceu sua senha?</Link>
                </Grid>
                <Grid xs={2} sm={2} style={styles.gridCenter} item>
                    <span>.</span>
                </Grid>
                <Grid xs={5} sm={5} style={styles.gridCenter} item>
                    <Link component={RouterLink} to="/signin">Cadastrar-se</Link>
                </Grid>
            </Grid>
        </LextaticoFormContentCenter>
    );
}

const ForgotPassword = ({ forgotBackHandleClick }) => {
    return (
        <LextaticoFormContentLeft>
            <LextaticoBackButton onClick={forgotBackHandleClick}><FontAwesomeIcon color="#fff" size="2x" icon={faArrowCircleLeft} /></LextaticoBackButton>
        </LextaticoFormContentLeft>
    )
}

const SwipeableForm = ({ ...props }) => {
    const [activeStepe, setActiveStep] = useState(0);

    const forgotHandleClick = () => {
        setActiveStep(1);
    }

    const forgotBackHandleClick = () => {
        setActiveStep(0);
    }

    return (
        <LextaticoBox>
            <LextaticoForm>
                <SwipeableViews index={activeStepe}>
                    <FormUser {...props} forgotHandleClick={forgotHandleClick} />
                    <ForgotPassword forgotBackHandleClick={forgotBackHandleClick} />
                </SwipeableViews>
            </LextaticoForm>

        </LextaticoBox>
    );
}

const Login = (props) => {
    const { setSnackBar } = useContext(MyContext);

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

    const isOk = formUser.email.value !== "" && formUser.password.value !== "";

    const handleSubmit = async e => {
        try {
            setLoading(true);

            formUser.errors = [];
            setFormUser((prev) => ({ ...prev, formUser }))

            const user = {
                email: formUser.email.value,
                password: formUser.password.value
            };

            const { data } = await AccountService.postLogin(user);

            if (data.errors.length === 0) {
                props.history.push("/app");
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
