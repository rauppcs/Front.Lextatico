import { api } from "./apiService";

const netError = {
	result: null,
	errors: [{
		property: "",
		message: "Erro de conexão."
	}]
}

export const httpStatusCodeValid = (statusCode) => {
	return statusCode >= 200 && statusCode < 299;
}

export const getQueryFor = async (route) => {
	try {
		const response = await api.get(route);

		return response;
	} catch (error) {
		if (!error.response) {
			error.response = {
				status: 999,
				data: netError
			}
		}

		return error.response;
	}
}

export const postQueryFor = async (route, data) => {
	try {
		const response = await api.post(route, data);
		
		return response;
	} catch (error) {
		if (!error.response) {
			error.response = {
				status: 999,
				data: netError
			}
		}

		return error.response;
	}
}

export const putQueryFor = async (route, data) => {
	try {
		const response = await api.put(route, data);

		return response;
	} catch (error) {
		if (!error.response) {
			error.response = {
				status: 999,
				data: netError
			}
		}

		return error.response;
	}
}

export const deleteQueryFor = async (route) => {
	try {
		const response = await api.delete < Number > (route);

		return response;
	} catch (error) {
		if (!error.response) {
			error.response = {
				status: 999,
				data: netError
			}
		}

		return error.response;
	}
};

export const downloadFileFor = async (route, fileName) => {
	try {
		const response = await api.get(route);

		const blob = new Blob([response.data]);

		const url = window.URL.createObjectURL(blob);

		const a = document.createElement("a");

		a.href = url;

		a.download = fileName;

		a.click();
	} catch (error) {
		if (!error.response) {
			error.response.data = netError;
		}

		return error.response;
	}
}
