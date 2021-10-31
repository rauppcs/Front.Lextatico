import { getQueryFor, postQueryFor, httpStatusCodeValid } from "./api";
import { login, logout } from "./authService";


const accountService = {
    async getUser() {
        const response = await getQueryFor("/api/account/get-user");

        return { response, result: response.data };
    },

    async login(formUser, setUser) {
        const response = await postQueryFor("/api/account/login", formUser);

        if (httpStatusCodeValid(response.status)) {
            login(response.data.data);

            setUser(response.data.data.user);
        }

        return { response, result: response.data };
    },

    async logout(setUser) {
        logout();

        setUser({});
    },

    async signIn(user) {
        const response = await postQueryFor("/api/account/signin", user);

        return { response, result: response.data };
    },

    async validateToken() {
        const response = await getQueryFor("/api/account/validate-token");

        return { response, result: httpStatusCodeValid(response.status) };
    },

    async refreshToken(refreshToken) {
        const response = await postQueryFor("/api/account/refresh-token", {
            refreshToken
        });

        if (httpStatusCodeValid(response.status) && response.data.errors.length === 0) {
            login(response.data.data);
        }

        return { response, result: response.data };
    },

    async resetPassword(user) {
        const response = await postQueryFor("/api/account/reset-password", user);

        return { response, result: response.data };
    },

    async forgotPassword(email) {
        const response = await postQueryFor("/api/account/forgot-password", {
            email
        });

        return { response, result: response.data };
    }
}

export default accountService;
