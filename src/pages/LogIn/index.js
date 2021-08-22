import React, { Component, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import { LextaticoTextField } from "../../components/Common";
import { LextaticoBoxError, LextaticoBox, LextaticoForm, LextaticoButton, LextaticoHr, LextaticoImg } from "./styles"
import Logo from "../../assets/Logo.png"
import { postQueryFor } from "../../services/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const FormComponent = ({ errors, email, password, setFormUser, isOk, handleSignUp, loading }) => (
    <LextaticoBox>
        <LextaticoForm>
            <LextaticoImg src={Logo} alt="Lextatico logo" />
            {errors.length > 0 && <LextaticoBoxError>{errors.map(error => error)}</LextaticoBoxError>}
            <LextaticoTextField
                type="email"
                label="Endereço de e-mail"
                variant="outlined"
                value={email.value}
                error={email.error != ""}
                helperText={email.error}
                onChange={e => setFormUser((prev) => ({ ...prev, email: { value: e.target.value, error: "" } }))}
            />
            <LextaticoTextField
                type="password"
                label="Senha"
                variant="outlined"
                value={password.value}
                error={password.error != ""}
                helperText={password.error}
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
)

const LogIn = () => {
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

    const handleSignUp = async e => {
        setLoading(true);

        formUser.errors = [];
        setFormUser((prev) => ({ ...prev, formUser }))

        const user = {
            email: formUser.email.value,
            password: formUser.password.value
        };

        const result = await postQueryFor("/api/account/login", user);

        if (result.errors) {
            result.errors.map(({ property, message }) => {
                if (property != "")
                    formUser[property.toLowerCase()].error = message;
                else {
                    formUser.errors.push(message)
                }
            })

            setFormUser((prev) => ({ ...prev, formUser }));
        }
        else {

        }

        setLoading(false);
    };

    return (
        <FormComponent isOk={formUser.email.value != "" && formUser.password.value != "" && !loading}
            errors={formUser.errors}
            email={formUser.email}
            password={formUser.password}
            setFormUser={setFormUser}
            handleSignUp={handleSignUp}
            loading={loading} />
    );
}

export default LogIn;
