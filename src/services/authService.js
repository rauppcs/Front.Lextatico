import accountService from "./accountService";

const USER_KEY = "@lextatico-User";
const TOKEN_KEY = "@lextatico-Token";

export const isAuthenticated = async () => {
	try {
		if (localStorage.getItem(TOKEN_KEY) === null) {
			return false;
		}

		const { data: tokenValid } = await accountService.validateToken();

		return tokenValid;
	} catch (error) {
		return false;
	}
};

export const getUser = () => localStorage.getItem(USER_KEY) ? JSON.parse(localStorage.getItem(USER_KEY)) : {};

export const getToken = () => localStorage.getItem(TOKEN_KEY) ? JSON.parse(localStorage.getItem(TOKEN_KEY)) : {};

export const login = ({ accessToken, refreshToken, user }) => {
	localStorage.setItem(USER_KEY, JSON.stringify(user));

	localStorage.setItem(TOKEN_KEY, JSON.stringify({
		accessToken,
		refreshToken
	}));
};

export const logout = () => {
	localStorage.removeItem(USER_KEY);
	localStorage.removeItem(TOKEN_KEY);
};
