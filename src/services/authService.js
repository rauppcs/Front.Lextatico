import { httpStatusCodeValid } from "./api";
import AccountService from "./accountService";

const TOKEN_KEY = "@lextatico-Token";

export const isAuthenticated = async () => {
	if (localStorage.getItem(TOKEN_KEY) === null) {
		return false;
	}

	const { accessToken, refreshToken } = getToken();

	const { data: tokenValid } = await AccountService.getValidateToken();

	if (tokenValid)
		return true;

	const { response, data: responseRefreshToken } = await AccountService.postRefreshToken(accessToken, refreshToken);

	if (httpStatusCodeValid(response.status) && responseRefreshToken.errors.length === 0) {
		return true;
	}

	return false;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY) ? JSON.parse(localStorage.getItem(TOKEN_KEY)) : {};

export const login = ({ accessToken, refreshToken }) => {
	localStorage.setItem(TOKEN_KEY, JSON.stringify({
		accessToken,
		refreshToken
	}));
};

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY);
};
