// import axios from "axios";
// import accountService from "../accountService";
// import { getToken } from "../authService";
// import { httpStatusCodeValid } from "../api";
// import { useContext } from "react";

// const netError = {
// 	result: null,
// 	errors: [{
// 		property: "",
// 		message: "Falha na conexão."
// 	}]
// }

// export const api = axios.create({
// 	baseURL: process.env.REACT_APP_API,
// });

// api.interceptors.request.use(async config => {
// 	const { accessToken } = getToken();
// 	if (accessToken) {
// 		config.headers.Authorization = `Bearer ${accessToken}`;
// 	}

// 	return config;
// });

// api.interceptors.response.use(resp => resp, async (error) => {
// 	if (!error.response) {
// 		error.response = {
// 			status: 999,
// 			data: netError
// 		}
// 		return Promise.reject(error);
// 	}

// 	const { status } = error.response;

// 	if (status === 401 && error.config && !error.config.__isRetryRequest) {
// 		error.config.__isRetryRequest = true;

// 		const { refreshToken } = getToken();

// 		const { response } = await accountService.refreshToken(refreshToken);

// 		// if (!httpStatusCodeValid(response.status))
// 		// 	setIsAuthenticated(false);

// 		return api.request(error.config);
// 	}

// 	if (status === 400 && error.config.url === "/auth/refresh-token")
// 		return error.response;

// 	return Promise.reject(error);
// });
