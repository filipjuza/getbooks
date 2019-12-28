/**
 * Inspired by qa-site from https://github.com/kdorland?tab=repositories
 */
class AuthService {
    constructor() {
        this.API_URL = process.env.REACT_APP_API_URL;
        this.LS_TOKEN_KEY = 'jwt-token';
        this.LS_USERNAME_KEY = 'username';
        this.LS_USER_ID_KEY = 'user-id';
        this.Role = {
            User: 'user',
            Admin: 'admin'
        };
    }

    /**
     * Get username from LocalStorage
     *
     * @returns {String | null}
     */
    getUsername() {
        return localStorage.getItem(this.LS_USERNAME_KEY);
    }

    /**
     * Save username to LocalStorage
     *
     * @param {String} username
     */
    setUsername(username) {
        localStorage.setItem(this.LS_USERNAME_KEY, username);
    }

    /**
     * Get JWT token from LocalStorage
     *
     * @returns {String | null}
     */
    getToken() {
        return localStorage.getItem(this.LS_TOKEN_KEY);
    }

    /**
     * Save JWT token to LocalStorage
     *
     * @param {String} username
     */
    setToken(token) {
        localStorage.setItem(this.LS_TOKEN_KEY, token);
    }

    /**
     * Authenticate user
     *
     * @param username
     * @param password
     * @returns {String} — JWT token
     */
    login(username, password) {
        return this.fetch(`${this.API_URL}/user/authenticate`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => res.json())
            .then(res => {
                this.setToken(res.token);
                this.setUsername(username);

                return res.token;
            });
    }

    /**
     * Logout currently logged-in user (removes data from LocalStorage)
     *
     */
    logout() {
        localStorage.removeItem(this.LS_TOKEN_KEY);
        localStorage.removeItem(this.LS_USERNAME_KEY);
    }

    /**
     * Check if user is logged in
     *
     * @returns {Boolean}
     */
    isLoggedIn() {
        // TODO: Check if token is expired using 'jwt-decode'
        // TODO: Also, install using 'npm install jwt-decode'
        /*
        if (jwtDecode(token).exp < Date.now() / 1000) {
            // Do something to renew token
        }
         */
        return this.getToken() !== null;
    }

    /**
     * Fetch using JWT authentication
     *
     * @param {String} url — Request URL
     * @param {Object} options — Fetch opitons
     * @returns {Promise<Respose>}
     */
    fetch(url, options) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.isLoggedIn()) {
            headers.Authorization = `Bearer ${this.getToken()}`;
        }

        return fetch(url, {
            headers,
            ...options
        }).then(AuthService.handleError);
    }

    static handleError(response) {
        if (!response.ok) {
            console.log('handleError not ok');
            console.log(response);

            // TODO: Display snackbar here
            throw new Error(response.statusText);
        }

        return response;
    }
}

/**
 * Export AuthService scoped to this module (as singleton)
 * https://medium.com/@dmnsgn/singleton-pattern-in-es6-d2d021d150ae
 */
export default new AuthService();
