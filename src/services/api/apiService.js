import axios from "axios";
import { getToken } from "../authService";

export const api = axios.create({
	baseURL: process.env.REACT_APP_API,
});

api.interceptors.request.use(async config => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});
