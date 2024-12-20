import React, { useContext, useEffect, useState } from "react"
import { Link as RouterLink, withRouter } from "react-router-dom"
import { IconButton, InputAdornment, Link, Typography } from "@material-ui/core";
import { LextaticoBoxError } from "../../styles/common"
import { LextaticoTextField, LextaticoBox, LextaticoForm, LextaticoButton, LextaticoHr, LextaticoImg } from "./styles"
import Logo from "../../assets/Logo.png"
import AccountService from "../../services/accountService"
import CircularProgress from '@material-ui/core/CircularProgress'
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ServiceContext from "../../contexts/services";

const LextaticoLink = (props) => {
    return <Link {...props} component={RouterLink}>{props.children}</Link>
}

const SignIn = (props) => {
    const { setSnackBar, setTitleName } = useContext(ServiceContext);

    useEffect(() => {
        setTitleName("SignIn");
    }, [setTitleName]);

    const [loading, setLoading] = useState(false);

    const [formUser, setFormUser] = useState({
        errors: [],
        name: {
            value: "",
            error: ""
        },
        email: {
            value: "",
            error: ""
        },
        password: {
            value: "",
            error: ""
        },
        confirmPassword: {
            value: "",
            error: ""
        }
    });

    const isOk = formUser.name.value !== "" &&
        formUser.email.value !== "" &&
        formUser.password.value !== "" &&
        formUser.confirmPassword.value !== "" &&
        !loading;

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async e => {
        try {
            setLoading(true);

            formUser.errors = [];
            setFormUser((prev) => ({ ...prev, formUser }))

            const user = {
                name: formUser.name.value,
                email: formUser.email.value,
                password: formUser.password.value,
                confirmPassword: formUser.confirmPassword.value
            };

            await AccountService.signIn(user);

            setSnackBar((prev) => ({ ...prev, open: true, severity: "success", message: "Cadastro realizado com sucesso." }));
            props.history.push("/login");

        } catch (error) {
            if (error.response.status >= 500)
                setSnackBar((prev) => ({ ...prev, open: true, severity: "error", message: error.response.data.errors.map(({ message }) => `${message}\n`) }));
            else {
                error.response.data.errors.forEach(({ property, message }) => {
                    if (property !== "")
                        formUser[property].error = message;
                    else {
                        formUser.errors.push(message)
                    }
                });

                setFormUser((prev) => ({ ...prev, formUser }));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <LextaticoBox>
            <LextaticoForm>
                <LextaticoImg src={Logo} alt="Lextatico logo" />
                <Typography style={{ width: "100%" }} variant="h5" paragraph component="h1">Crie uma conta.</Typography>
                {formUser.errors.length > 0 && <LextaticoBoxError>{formUser.errors.map(error => <span>* {error}</span>)}</LextaticoBoxError>}
                <LextaticoTextField
                    type="text"
                    required
                    label="Nome"
                    variant="outlined"
                    value={formUser.name.value}
                    error={formUser.name.error !== ""}
                    helperText={formUser.name.error}
                    onChange={e => setFormUser((prev) => ({ ...prev, name: { value: e.target.value, error: "" } }))}
                />
                <LextaticoTextField
                    type="email"
                    required
                    label="Endereço de e-mail"
                    variant="outlined"
                    value={formUser.email.value}
                    error={formUser.email.error !== ""}
                    helperText={formUser.email.error}
                    onChange={e => setFormUser((prev) => ({ ...prev, email: { value: e.target.value, error: "" } }))}
                />
                <LextaticoTextField
                    type={showPassword ? "text" : "password"}
                    required
                    label="Senha"
                    variant="outlined"
                    value={formUser.password.value}
                    error={formUser.password.error !== ""}
                    helperText={formUser.password.error}
                    onChange={e => setFormUser((prev) => ({ ...prev, password: { value: e.target.value, error: "" } }))}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Exibir senha"
                                    onClick={handleClickShowPassword}
                                >
                                    {!showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <LextaticoTextField
                    type={showPassword ? "text" : "password"}
                    required
                    label="Confirmação de senha"
                    variant="outlined"
                    value={formUser.confirmPassword.value}
                    error={formUser.confirmPassword.error !== ""}
                    helperText={formUser.confirmPassword.error}
                    onKeyDown={e => e.key === "Enter" && isOk ? handleSubmit(e) : null}
                    onChange={e => setFormUser((prev) => ({ ...prev, confirmPassword: { value: e.target.value, error: "" } }))}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Exibir senha"
                                    onClick={handleClickShowPassword}
                                >
                                    {!showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <LextaticoButton variant="contained" color="primary" onClick={handleSubmit} disabled={!isOk} type="submit">{!loading
                    ? "Cadastrar"
                    : <CircularProgress size={30} color={"white"} />}
                </LextaticoButton>
                <LextaticoHr />
                <Typography component={LextaticoLink} to="/login">Login</Typography>
            </LextaticoForm>
        </LextaticoBox>
    );
}

export default withRouter(SignIn);
