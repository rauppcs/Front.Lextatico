import { getQueryFor, postQueryFor, httpStatusCodeValid } from "./api";

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

        return { response, data: httpStatusCodeValid(response.status)};
    },

    async postRefreshToken(token, refreshToken) {
        const response = await postQueryFor("/api/account/refresh-token", {
            token,
            refreshToken
        });

        return { response, data: result(response.data)};
    },

    async postLogin(user) {
        const response = await postQueryFor("/api/account/login", user);

        return { response, data: result(response.data)};
    },

    async postSignIn(user) {
        const response = await postQueryFor("/api/account/signin", user);

        return { response, data: result(response.data)};
    }
}

export default AccountService;
