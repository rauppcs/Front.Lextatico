import React, { useContext, useState } from "react"
import { Link as RouterLink, withRouter } from "react-router-dom"
import { Link } from "@material-ui/core";
import { LextaticoTextField, LextaticoBoxError, LextaticoBox, LextaticoForm, LextaticoButton, LextaticoHr, LextaticoImg } from "./styles"
import Logo from "../../assets/Logo.png"
import AccountService from "../../services/accountService"
import { login } from "../../services/authService"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { MyContext } from "../../App";

const SignIn = (props) => {
    const { setStateSnackBar } = useContext(MyContext);

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
        formUser.confirmPassword.value !== "";

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

            const { data } = await AccountService.postSignIn(user);

            if (data.errors.length === 0) {
                props.history.push("/login");
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
            setStateSnackBar((prev) => ({ ...prev, open: true, severity: "error", message: "Erro de conexão."}));
        } finally {
            setLoading(false);
        }
    };

    return (
        <LextaticoBox>
            <LextaticoForm>
                <LextaticoImg src={Logo} alt="Lextatico logo" />
                {formUser.errors.length > 0 && <LextaticoBoxError>{formUser.errors.map(error => error)}</LextaticoBoxError>}
                <LextaticoTextField
                    type="text"
                    label="Nome"
                    variant="outlined"
                    value={formUser.name.value}
                    error={formUser.name.error !== ""}
                    helperText={formUser.name.error}
                    onChange={e => setFormUser((prev) => ({ ...prev, name: { value: e.target.value, error: "" } }))}
                />
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
                    onChange={e => setFormUser((prev) => ({ ...prev, password: { value: e.target.value, error: "" } }))}
                />
                <LextaticoTextField
                    type="password"
                    label="Confirmação de senha"
                    variant="outlined"
                    value={formUser.confirmPassword.value}
                    error={formUser.confirmPassword.error !== ""}
                    helperText={formUser.confirmPassword.error}
                    onKeyDown={e => e.key === "Enter" && isOk ? handleSubmit(e) : null}
                    onChange={e => setFormUser((prev) => ({ ...prev, confirmPassword: { value: e.target.value, error: "" } }))}
                />
                <LextaticoButton onClick={handleSubmit} disabled={!isOk} type="submit">{!loading
                    ? "Cadastrar"
                    : <FontAwesomeIcon color="#fff" size="2x" icon={faSpinner} spin />}
                </LextaticoButton>
                <LextaticoHr />
                <Link component={RouterLink} to="/login">Login</Link>
            </LextaticoForm>
        </LextaticoBox>
    );
}

export default withRouter(SignIn);
