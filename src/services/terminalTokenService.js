import { getQueryFor } from "./api";

const terminalTokenService = {
    async getTerminalTokens() {
        const response = await getQueryFor("/terminal-token");

        return { response, result: response.data };
    }
}

export default terminalTokenService;
