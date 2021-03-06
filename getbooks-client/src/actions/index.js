import jwt_decode from 'jwt-decode';

import AuthService from '../services/auth.service';

const API_URL = process.env.REACT_APP_API_URL;

/** *************************************************
 * Category actions
 ************************************************* */
export const addCategory = (id, name, slug) => ({
    type: 'ADD_CATEGORY',
    id,
    name,
    slug
});

export const replaceCategories = categories => ({
    type: 'REPLACE_CATEGORIES',
    categories
});

export const setCategoriesLoading = isLoading => ({
    type: 'SET_CATEGORIES_LOADING',
    isLoading
});

export const fetchCategories = () =>
    function(dispatch) {
        dispatch(setCategoriesLoading(true));

        return AuthService.fetch(`${API_URL}/category`)
            .then(res => res.json())
            .then(categories => dispatch(replaceCategories(categories)))
            .finally(() => dispatch(setCategoriesLoading(false)));
    };

export const createCategory = (name, slug) =>
    function(dispatch) {
        return AuthService.fetch(`${API_URL}/category`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                slug
            })
        })
            .then(res => res.json())
            .then(category => dispatch(addCategory(category._id, category.name, category.slug)));
    };

/** *************************************************
 * Book actions
 ************************************************* */
export const addBook = (id, title, author, price, slug, image, user, category) => ({
    type: 'ADD_BOOK',
    id,
    title,
    author,
    price,
    slug,
    image,
    user,
    category
});

export const replaceBooks = books => ({
    type: 'REPLACE_BOOKS',
    books
});

export const updateBookDetail = book => ({
    type: 'UPDATE_BOOK_DETAIL',
    book
});

export const setBooksLoading = isLoading => ({
    type: 'SET_BOOKS_LOADING',
    isLoading
});

export const setBookDetailLoading = isLoading => ({
    type: 'SET_BOOK_DETAIL_LOADING',
    isLoading
});

export const fetchBooks = categorySlug =>
    function(dispatch) {
        dispatch(setBooksLoading(true));

        return AuthService.fetch(`${API_URL}/category/${categorySlug}/book`)
            .then(res => res.json())
            .then(books => dispatch(replaceBooks(books)))
            .finally(() => dispatch(setBooksLoading(false)));
    };

export const fetchBook = slug =>
    function(dispatch) {
        dispatch(setBookDetailLoading(true));

        return AuthService.fetch(`${API_URL}/book/${slug}`)
            .then(res => res.json())
            .then(book => dispatch(updateBookDetail(book)))
            .finally(() => dispatch(setBookDetailLoading(false)));
    };

export const createBook = book =>
    function(dispatch) {
        return AuthService.fetch(`${API_URL}/book`, {
            method: 'POST',
            body: JSON.stringify({
                ...book
            })
        });
    };

/** *************************************************
 * User actions
 ************************************************* */
export const updateUserCredentials = (username, role = AuthService.Role.User) => ({
    type: 'UPDATE_USER_CREDENTIALS',
    username,
    role
});

export const removeUserCredentials = () => ({
    type: 'REMOVE_USER_CREDENTIALS'
});

export const login = (username, password) =>
    function(dispatch) {
        return AuthService.login(username, password).then(token => {
            const { role } = jwt_decode(token);

            dispatch(updateUserCredentials(username, role));
        });
    };

export const logout = () =>
    function(dispatch) {
        AuthService.logout();

        return dispatch(removeUserCredentials());
    };
