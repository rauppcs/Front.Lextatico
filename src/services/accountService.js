import { getQueryFor, postQueryFor, httpStatusCodeValid } from "./api";
import { login, logout } from "./authService";


const accountService = {
    async getUser() {
        const response = await getQueryFor("/api/account/get-user");

        return { response, data: response.data };
    },

    async login(formUser, setUser) {
        const response = await postQueryFor("/api/account/login", formUser);

        if (httpStatusCodeValid(response.status)) {
            login(response.data.result);

            setUser(response.data.result.user);
        }

        return { response, data: response.data };
    },

    async logout(setUser) {
        logout();

        setUser({});
    },

    async signIn(user) {
        const response = await postQueryFor("/api/account/signin", user);

        return { response, data: response.data };
    },

    async validateToken() {
        const response = await getQueryFor("/api/account/validate-token");

        return { response, data: httpStatusCodeValid(response.status) };
    },

    async refreshToken(refreshToken) {
        const response = await postQueryFor("/api/account/refresh-token", {
            refreshToken
        });

        if (httpStatusCodeValid(response.status) && response.data.errors.length === 0) {
            login(response.data.result);
        }

        return { response, data: response.data };
    },

    async resetPassword(user) {
        const response = await postQueryFor("/api/account/reset-password", user);

        return { response, data: response.data };
    },

    async forgotPassword(email) {
        const response = await postQueryFor("/api/account/forgot-password", {
            email
        });

        return { response, data: response.data };
    }
}

export default accountService;
