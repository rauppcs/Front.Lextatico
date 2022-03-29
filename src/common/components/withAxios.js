import axios from "axios";
import { useContext, useMemo } from "react";
import AuthContext from "../../contexts/auth";
import ServiceContext from "../../contexts/services";
import accountService from "../../services/accountService";
import { httpStatusCodeValid } from "../../services/api";
import { getToken, logout } from "../../services/authService";

const netError = {
    result: null,
    errors: [{
        property: "",
        message: "Falha na conexão."
    }]
}

export const api = axios.create({
    baseURL: process.env.REACT_APP_API,
});

const WithAxios = ({ children }) => {
    const { setSnackBar } = useContext(ServiceContext);

    const { setIsAuthenticated } = useContext(AuthContext);

    useMemo(() => {
        api.interceptors.request.use(async config => {
            const { accessToken } = getToken();
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        });

        api.interceptors.response.use(resp => resp, async (error) => {
            if (!error.response) {
                error.response = {
                    status: 999,
                    data: netError
                }
                return Promise.reject(error);
            }

            const { status } = error.response;

            if (status === 401 && error.config && !error.config.__isRetryRequest) {
                error.config.__isRetryRequest = true;

                const { refreshToken } = getToken();

                const { response } = await accountService.refreshToken(refreshToken);

                if (!httpStatusCodeValid(response.status)) {
                    accountService.logout();
                    setIsAuthenticated(false);
                    setSnackBar((prev) => ({ ...prev, open: true, severity: "warning", message: "Seu login expirou, faça o login novamente para continuar navegando." }));

                    return Promise.reject(error);
                }

                return api.request(error.config);
            }

            if (status === 400 && error.config.url === "/auth/refresh-token")
                return error.response;

            return Promise.reject(error);
        });
    }, [setIsAuthenticated, setSnackBar])

    return children;
}

export default WithAxios;
