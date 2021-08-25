import axios from "axios";
import { getToken } from "../authService";

const netError = {
	result: null,
	errors: [{
		property: "",
		message: "Falha na conexão."
	}]
}

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
		error.response = {
			status: 999,
			data: netError
		}
		return Promise.reject(error);
	}

	return Promise.resolve(error.response);
});
