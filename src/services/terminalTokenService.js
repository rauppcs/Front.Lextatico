import { getQueryFor } from "./api";

const terminalTokenService = {
    async getTerminalTokens() {
        const response = await getQueryFor("/api/terminal-token");

        return { response, result: response.data };
    }
}

export default terminalTokenService;
