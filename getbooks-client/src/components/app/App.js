/* eslint-disable react/prop-types */
import './App.scss';

import { Router } from '@reach/router';
import jwt_decode from 'jwt-decode';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    createBook,
    createCategory,
    fetchBook,
    fetchBooks,
    fetchCategories,
    login,
    logout,
    updateUserCredentials,
} from '../../actions';
import AuthService from '../../services/auth.service';
import Admin from '../admin/Admin';
import Book from '../book/Book';
import Categories from '../categories/Categories';
import Category from '../category/Category';
import CreateBook from '../create-book/CreateBook';
import LoginForm from '../login-form/LoginForm';
import Navbar from '../navbar/Navbar';

class App extends Component {
    constructor(props) {
        super(props);

        this.API_URL = process.env.REACT_APP_API_URL;
    }

    async componentDidMount() {
        await this.props.fetchCategories();

        if (AuthService.isLoggedIn()) {
            const token = AuthService.getToken();
            const { role } = jwt_decode(token);

            this.props.updateUserCredentials(AuthService.getUsername(), role);
        }
    }

    render() {
        return (
            <>
                <header>
                    <Navbar user={this.props.user} logout={() => this.props.logout()} />
                </header>
                <Router>
                    <Categories path="/" user={this.props.user} categories={this.props.categories} />
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
                        user={this.props.user}
                    />
                    <LoginForm path="/login" login={(username, password) => this.props.login(username, password)} />
                    <Admin
                        path="/admin"
                        categories={this.props.categories}
                        user={this.props.user}
                        createCategory={(name, slug) => this.props.createCategory(name, slug)}
                    />
                </Router>
            </>
        );
    }
}

const mapStatetoProps = state => ({
    categories: state.categories,
    books: state.books,
    bookDetail: state.bookDetail,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
    fetchBooksByCategory: slug => dispatch(fetchBooks(slug)),
    fetchBookBySlug: slug => dispatch(fetchBook(slug)),
    createCategory: (name, slug) => dispatch(createCategory(name, slug)),
    createBook: book => dispatch(createBook(book)),
    login: (username, password) => dispatch(login(username, password)),
    logout: () => dispatch(logout()),
    updateUserCredentials: (username, role) => dispatch(updateUserCredentials(username, role))
});

export default connect(mapStatetoProps, mapDispatchToProps)(App);
