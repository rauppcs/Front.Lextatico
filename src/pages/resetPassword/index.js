import { Typography, Link, InputAdornment, IconButton } from "@material-ui/core"
import CircularProgress from '@material-ui/core/CircularProgress'
import { useState, useContext, useEffect } from "react"
import { useLocation } from "react-router"
import { Link as RouterLink } from "react-router-dom"
import AccountService from "../../services/accountService"
import { useQuery } from "../../utils/url"
import { LextaticoTextField, LextaticoBox, LextaticoForm, LextaticoFormContentLeft, LextaticoButton, LextaticoHr } from "./styles"
import { LextaticoBoxError } from "../../styles/common"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import ServiceContext from "../../contexts/services"

const LextaticoLink = (props) => {
    return <Link {...props} component={RouterLink}>{props.children}</Link>
}

const ResetPassword = (props) => {
    const { setSnackBar, setTitleName } = useContext(ServiceContext);

    useEffect(() => {
        setTitleName("Reset password");
    }, [setTitleName]);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const query = useQuery(useLocation().search)

    const email = query.get("email");

    const resetToken = decodeURIComponent(encodeURIComponent(query.get("resetToken")).replaceAll("%20", "+"));

    const [loading, setLoading] = useState(false);

    const [formUser, setFormUser] = useState({
        errors: [],
        password: {
            value: "",
            error: ""
        },
        confirmPassword: {
            value: "",
            error: ""
        }
    });

    const isOk = formUser.password.value !== "" &&
        formUser.confirmPassword.value !== "" &&
        !loading;

    const handleSubmit = async () => {
        try {
            formUser.errors = [];
            setFormUser((prev) => ({ ...prev, formUser }))

            setLoading(true);

            const user = {
                email,
                resetToken,
                password: formUser.password.value,
                confirmPassword: formUser.confirmPassword.value
            }

            await AccountService.resetPassword(user);

            setSnackBar((prev) => ({ ...prev, open: true, severity: "success", message: "Senha resetada." }));
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
    }

    return (
        <LextaticoBox>
            <LextaticoForm>
                <LextaticoFormContentLeft>
                    <Typography style={{ width: "100%" }} variant="h5" paragraph component="h1">Resete a senha.</Typography>
                    {formUser.errors.length > 0 && <LextaticoBoxError>{formUser.errors.map(error => <span>* {error}</span>)}</LextaticoBoxError>}
                    <LextaticoTextField
                        type={showPassword ? "text" : "password"}
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
                        label="Confirmação de senha"
                        variant="outlined"
                        value={formUser.confirmPassword.value}
                        error={formUser.confirmPassword.error !== ""}
                        helperText={formUser.confirmPassword.error}
                        onKeyDown={e => e.key === "Enter" && isOk ? handleSubmit() : null}
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
                    <LextaticoButton onClick={handleSubmit} disabled={!isOk} type="submit">{!loading
                        ? "Resetar"
                        : <CircularProgress size={30} color={"white"} />}
                    </LextaticoButton>
                    <LextaticoHr />
                    <Typography style={{ width: "100%", display: "flex", justifyContent: "center" }} component={LextaticoLink} to="/login">Login</Typography>
                </LextaticoFormContentLeft>
            </LextaticoForm>
        </LextaticoBox>
    )
}

export default ResetPassword;
