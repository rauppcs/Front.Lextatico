import { getQueryFor, postQueryFor, putQueryFor, deleteQueryFor } from "./api";

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
    async postLogin(user) {
        const { response, data } = await postQueryFor("/api/account/login", user);

        return result(data);
    }
}

export default AccountService;