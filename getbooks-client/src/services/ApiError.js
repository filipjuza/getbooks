export default class ApiError extends Error {
    constructor(message, response) {
        super(message);

        this.name = 'ApiError';
        this.response = response;
    }
}
