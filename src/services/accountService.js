import { getQueryFor, postQueryFor, httpStatusCodeValid } from "./api";
import { login } from "./authService";

const result = (data) => {
    if (data)
        return data;
    else
        data = {
            result: null,
            errors: [{
                property: "NETWORK_ERROR",
                message: "Erro de conexão."
            }]
        }
}

const AccountService = {
    async getValidateToken() {
        const response = await getQueryFor("/api/account/validate-token");

        return { response, data: httpStatusCodeValid(response.status) };
    },

    async postRefreshToken(refreshToken) {
        const response = await postQueryFor("/api/account/refresh-token", {
            refreshToken
        });

        if (httpStatusCodeValid(response.status) && response.data.errors.length === 0) {
            login(response.data.result);
        }

        return { response, data: result(response.data) };
    },

    async postLogin(user) {
        const response = await postQueryFor("/api/account/login", user);

        if (httpStatusCodeValid(response.status) && response.data.errors.length === 0) {
            login(response.data.result);
        }

        return { response, data: result(response.data) };
    },

    async postSignIn(user) {
        const response = await postQueryFor("/api/account/signin", user);

        return { response, data: result(response.data) };
    }
}

export default AccountService;
