import { combineReducers } from 'redux';

function categories(state = { isLoading: false, categories: [] }, action) {
    switch (action.type) {
        case 'ADD_CATEGORY': {
            return {
                ...state,
                categories: [...state.categories, { _id: action.id, name: action.name, slug: action.slug }]
            };
        }
        case 'SET_CATEGORIES_LOADING': {
            return { ...state, isLoading: action.isLoading };
        }
        case 'REPLACE_CATEGORIES': {
            return { ...state, categories: action.categories };
        }
        default: {
            return state;
        }
    }
}

function books(state = { isLoading: false, books: [] }, action) {
    switch (action.type) {
        case 'ADD_BOOK': {
            return {
                ...state,
                books: [
                    ...state.books,
                    {
                        _id: action.id,
                        title: action.title,
                        author: action.author,
                        price: action.price,
                        slug: action.slug,
                        image: action.image,
                        user: action.user,
                        category: action.category
                    }
                ]
            };
        }
        case 'REPLACE_BOOKS': {
            return { ...state, books: action.books };
        }
        case 'SET_BOOKS_LOADING': {
            return { ...state, isLoading: action.isLoading };
        }
        default: {
            return state;
        }
    }
}

function bookDetail(state = { isLoading: true }, action) {
    switch (action.type) {
        case 'UPDATE_BOOK_DETAIL': {
            return { ...state, isLoading: false, book: action.book };
        }
        case 'SET_BOOK_DETAIL_LOADING': {
            return { ...state, isLoading: action.isLoading };
        }
        default: {
            return state;
        }
    }
}

function user(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_USER_CREDENTIALS': {
            return { ...state, username: action.username };
        }
        case 'REMOVE_USER_CREDENTIALS': {
            return {};
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    categories,
    books,
    bookDetail,
    user
});
