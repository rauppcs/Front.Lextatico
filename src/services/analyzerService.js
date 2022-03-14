import { getQueryFor, postQueryFor, httpStatusCodeValid, deleteQueryFor, putQueryFor } from "./api";

const analyzerService = {
    async getAnalyzer(id) {
        const response = await getQueryFor(`/analyzer/${id}`);

        return { response, result: response.data };
    },

    async getAnalyzers(page = 1, size = 10) {
        const response = await getQueryFor(`/analyzer?page=${page}&size=${size}`);

        return {
            response, result: {
                page: response.data.page,
                size: response.data.size,
                totalPages: response.data.totalPages,
                totalRecords: response.data.totalRecords,
                data: response.data.data
            }
        };
    },

    async postAnalyzer(analyzer) {
        const response = await postQueryFor("/analyzer", analyzer);

        return { response, result: response.data };
    },

    async postTestAnalyzer(id, content) {
        const response = await postQueryFor(`/analyzer/${id}/test`, {
            content
        });

        return { response, result: response.data };
    },

    async putAnalyzer(id, analyzer) {
        const response = await putQueryFor(`/analyzer/${id}`, analyzer);

        return { response, result: response.data };
    },

    async deleteAnalyzer(analyzerId) {
        const response = await deleteQueryFor(`/analyzer/${analyzerId}`)

        return { response, result: httpStatusCodeValid(response.status) }
    },

    async deleteAnalyzers(analyzerIds) {
        const response = await postQueryFor("/analyzer/deleteBulk", analyzerIds);

        return { response, result: httpStatusCodeValid(response.status) };
    }
}

export default analyzerService;
