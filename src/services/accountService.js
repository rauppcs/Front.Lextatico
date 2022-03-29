import { getQueryFor, postQueryFor, httpStatusCodeValid } from "./api";
import { login, logout } from "./authService";

const accountService = {
    async getUser() {
        const response = await getQueryFor("/account/get-user");

        return { response, result: response.data };
    },

    async login(formUser) {
        const response = await postQueryFor("/auth/login", formUser);

        if (httpStatusCodeValid(response.status))
            login(response.data.data);

        return { response, result: response.data };
    },

    async logout() {
        logout();
    },

    async signIn(user) {
        const response = await postQueryFor("/account/signin", user);

        return { response, result: response.data };
    },

    async validateToken() {
        const response = await getQueryFor("/auth/validate-token");

        return { response, result: httpStatusCodeValid(response.status) };
    },

    async refreshToken(refreshToken) {
        const response = await postQueryFor("/auth/refresh-token", {
            refreshToken
        });

        if (httpStatusCodeValid(response.status) && response.data.errors.length === 0) {
            login(response.data.data);
        } else {
            logout();
        }

        return { response, result: response.data };
    },

    async resetPassword(user) {
        const response = await postQueryFor("/account/reset-password", user);

        return { response, result: response.data };
    },

    async forgotPassword(email) {
        const response = await postQueryFor("/account/forgot-password", {
            email
        });

        return { response, result: response.data };
    }
}

export default accountService;
