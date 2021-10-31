import { getQueryFor, postQueryFor, httpStatusCodeValid, deleteQueryFor } from "./api";

const analyzerService = {
    async getAnalyzers(page = 1, size = 10) {
        const response = await getQueryFor(`/api/analyzer?page=${page}&size=${size}`);

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
        const response = await postQueryFor("/api/analyzer", analyzer);

        return { response, result: response.data };
    },

    async deleteAnalyzer(analyzerId) {
        const response = await deleteQueryFor(`/api/analyzer/${analyzerId}`)

        return { response, result: httpStatusCodeValid(response.status) }
    },

    async deleteAnalyzers(analyzerIds) {
        const response = await postQueryFor("/api/analyzer/deleteBulk", analyzerIds);

        return { response, result: httpStatusCodeValid(response.status) };
    }
}

export default analyzerService;
