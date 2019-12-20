/* eslint-disable react/prop-types */
import './App.scss';

import { Link, Router } from '@reach/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    createBook,
    createCategory,
    fetchAllCategories,
    fetchBookBySlug,
    fetchBooksByCategory,
    login,
    logout,
} from '../../actions';
import Book from '../book/Book';
import Categories from '../categories/Categories';
import Category from '../category/Category';
import CreateBook from '../create-book/CreateBook';
import LoginForm from '../login-form/LoginForm';

class App extends Component {
    constructor(props) {
        super(props);

        this.API_URL = process.env.REACT_APP_API_URL;
    }

    async componentDidMount() {
        await this.props.fetchCategories();
    }

    render() {
        return (
            <>
                <header>
                    <Link to="/">
                        <h1>getbooks.now</h1>
                    </Link>
                </header>
                <Router>
                    <Categories path="/" categories={this.props.categories} />
                    <Category
                        path="/category/:slug"
                        books={this.props.books}
                        categories={this.props.categories}
                        fetchBooks={slug => this.props.fetchBooksByCategory(slug)}
                    />
                    <Book
                        path="/book/:slug"
                        bookDetail={this.props.bookDetail}
                        fetchBookBySlug={slug => this.props.fetchBookBySlug(slug)}
                    />
                    <CreateBook
                        path="/add-book"
                        categories={this.props.categories}
                        createBook={book => this.props.createBook(book)}
                    />
                    <LoginForm path="/login" login={(username, password) => this.props.login(username, password)} />
                </Router>
            </>
        );
    }
}

const mapStatetoProps = state => ({
    categories: state.categories,
    books: state.books,
    bookDetail: state.bookDetail
});

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchAllCategories()),
    fetchBooksByCategory: slug => dispatch(fetchBooksByCategory(slug)),
    fetchBookBySlug: slug => dispatch(fetchBookBySlug(slug)),
    createCategory: (name, slug) => dispatch(createCategory(name, slug)),
    createBook: book => dispatch(createBook(book)),
    login: (username, password) => dispatch(login(username, password)),
    logout: () => dispatch(logout())
});

export default connect(mapStatetoProps, mapDispatchToProps)(App);
