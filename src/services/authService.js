export const TOKEN_KEY = "@lextatico-Token";

export const isAuthenticated = () => {
	if (localStorage.getItem(TOKEN_KEY) == null)
		return false;
	return true;
};

export const getToken = () => JSON.parse(localStorage.getItem(TOKEN_KEY));

export const login = ({ accessToken, refreshToken }) => {
	localStorage.setItem(TOKEN_KEY, JSON.stringify({
		accessToken,
		refreshToken
	}));
};

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY);
};
