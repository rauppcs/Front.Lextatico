import { AxiosResponse } from "axios";
import { api } from "./api";

export const getQueryFor = async (route) => {
    const response = await api.get(route);

    return {
        response,
        data: response.data
    };
}

export const postQueryFor = async (route, data) => {
    try {
        const response = await api.post(route, data);

        return (response, response.data);
    } catch (error) {
        return (error.response, error.response.data);
    }
}

export const putQueryFor = async (route, data) => {
    const response = await api.put(route, data);

    return (response, response.data);
}

export const deleteQueryFor = async (route) => {
    const response = await api.delete < Number > (route);

    return (response, response.data);
};

export const downloadFileFor = async (route, fileName) => {
    const response = await api.get(route);

    const blob = new Blob([response.data]);

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = fileName;

    a.click();
}

// export const uploadFileFor = async (route, file) => {

// }
