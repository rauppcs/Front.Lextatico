import axios from "axios";
import { getToken } from "../authService";

export const api = axios.create({
	baseURL: process.env.REACT_APP_API,
});

api.interceptors.request.use(async config => {
	const { accessToken } = getToken();
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

api.interceptors.response.use(resp => resp, (error) => {
	if (!error.response) {
		alert(error);
		return Promise.reject(error);
	} else {
		return Promise.reject(error);
	}
});
