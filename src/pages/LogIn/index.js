import React, { useState } from "react"
import { Link as RouterLink, withRouter } from "react-router-dom"
import { Link } from "@material-ui/core";
import { LextaticoTextField, LextaticoBoxError, LextaticoBox, LextaticoForm, LextaticoButton, LextaticoHr, LextaticoImg } from "./styles"
import Logo from "../../assets/Logo.png"
import AccountService from "../../services/accountService"
import { login } from "../../services/authService"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const LogIn = (props) => {


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

    const handleSignUp = async e => {
        setLoading(true);

        formUser.errors = [];
        setFormUser((prev) => ({ ...prev, formUser }))

        const user = {
            email: formUser.email.value,
            password: formUser.password.value
        };

        const response = await AccountService.postLogin(user);

        if (response.errors.length === 0) {
            login(response.result);
            props.history.push("/");
        }
        else {
            response.errors.forEach(({ property, message }) => {
                if (property !== "")
                    formUser[property.toLowerCase()].error = message;
                else {
                    formUser.errors.push(message)
                }
            });

            setFormUser((prev) => ({ ...prev, formUser }));
        }

        setLoading(false);
    };

    return (
        <LextaticoBox>
            <LextaticoForm>
                <LextaticoImg src={Logo} alt="Lextatico logo" />
                {formUser.errors.length > 0 && <LextaticoBoxError>{formUser.errors.map(error => error)}</LextaticoBoxError>}
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
                <LextaticoButton onClick={handleSignUp} disabled={!isOk} type="submit">{!loading
                    ? "Entrar"
                    : <FontAwesomeIcon color="#fff" size="2x" icon={faSpinner} spin />}
                </LextaticoButton>
                <LextaticoHr />
                <Link component={RouterLink} to="/signin">Cadastrar-se</Link>
            </LextaticoForm>
        </LextaticoBox>
    );
}

export default withRouter(LogIn);
