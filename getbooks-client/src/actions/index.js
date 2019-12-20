import { navigate } from '@reach/router';

import AuthService from '../services/auth.service';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Category actions
 */
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

export const fetchAllCategories = () =>
    async function(dispatch) {
        const response = await AuthService.fetch(`${API_URL}/category`);
        const categories = await response.json();

        dispatch(replaceCategories(categories));
    };

export const createCategory = (name, slug) =>
    async function(dispatch) {
        const response = await AuthService.fetch(`${API_URL}/category`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                name,
                slug
            })
        });

        const category = await response.json();

        dispatch(addCategory(category._id, category.name, category.slug));
    };

/**
 * Book actions
 */
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

export const updateBookDetail = book => ({
    type: 'UPDATE_BOOK_DETAIL',
    book
});

export const setBookDetailLoading = isLoading => ({
    type: 'SET_BOOK_DETAIL_LOADING',
    isLoading
});

export const replaceBooks = books => ({
    type: 'REPLACE_BOOKS',
    books
});

export const fetchBooksByCategory = categorySlug =>
    async function(dispatch) {
        const response = await AuthService.fetch(`${API_URL}/category/${categorySlug}/book`);
        const books = await response.json();

        dispatch(replaceBooks(books));
    };

export const fetchBookBySlug = slug =>
    async function(dispatch) {
        dispatch(setBookDetailLoading(true));

        const response = await AuthService.fetch(`${API_URL}/book/${slug}`);
        const book = await response.json();

        dispatch(updateBookDetail(book));
    };

export const createBook = book =>
    async function(dispatch) {
        await AuthService.fetch(`${API_URL}/book`, {
            method: 'POST',
            body: JSON.stringify({
                ...book
            })
        });

        // const newBook = await response.json();
    };

/**
 * User actions
 */
export const login = (username, password) =>
    async function(dispatch) {
        try {
            await AuthService.login(username, password);
            // dispatch(addUserCredentials(username));
            navigate('/'); // Front page
        } catch (e) {
            // dispatch(showAndHideAlert('Login Failed', e.message, 'error'));
        }
    };

export const logout = () =>
    async function(dispatch) {
        AuthService.logout();
        // dispatch(removeUserCredentials());
    };
