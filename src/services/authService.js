import AccountService from "./accountService";

const TOKEN_KEY = "@lextatico-Token";

export const isAuthenticated = async () => {
	try {
		if (localStorage.getItem(TOKEN_KEY) === null) {
			return false;
		}

		const { data: tokenValid } = await AccountService.getValidateToken();

		return tokenValid;
	} catch (error) {
		return false;
	}
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
