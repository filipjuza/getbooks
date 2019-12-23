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

export const fetchCategories = () =>
    function(dispatch) {
        return AuthService.fetch(`${API_URL}/category`)
            .then(res => res.json())
            .then(categories => dispatch(replaceCategories(categories)));
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

export const setBookDetailLoading = isLoading => ({
    type: 'SET_BOOK_DETAIL_LOADING',
    isLoading
});

export const fetchBooks = categorySlug =>
    function(dispatch) {
        return AuthService.fetch(`${API_URL}/category/${categorySlug}/book`)
            .then(res => res.json())
            .then(books => dispatch(replaceBooks(books)));
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
export const updateUserCredentials = username => ({
    type: 'UPDATE_USER_CREDENTIALS',
    username
});

export const removeUserCredentials = () => ({
    type: 'REMOVE_USER_CREDENTIALS'
});

export const login = (username, password) =>
    function(dispatch) {
        return AuthService.login(username, password).then(token => dispatch(updateUserCredentials(username)));
    };

export const logout = () =>
    function(dispatch) {
        AuthService.logout();

        return dispatch(removeUserCredentials());
    };
