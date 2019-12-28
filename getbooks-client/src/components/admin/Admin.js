/* eslint-disable react/no-unescaped-entities */
import { Link, navigate } from '@reach/router';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';

import AuthService from '../../services/auth.service';

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            slug: '',
            slugInvalid: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props
            .createCategory(this.state.name, this.state.slug)
            .then(() => {
                this.setState({ name: '', slug: '' });
            })
            .catch(err => {
                const { response } = err;

                if (response.status === 400) {
                    this.setState((state, props) => ({
                        ...state,
                        slugInvalid: true
                    }));
                }
            });
    }

    render() {
        const { categories } = this.props.categories;

        const loggedOutState = (
            <>
                <p>
                    <span>You need to </span>
                    <Link to="/login">log in</Link>
                    <span> first.</span>
                </p>
            </>
        );

        const restrictedState = (
            <>
                <p>You don't have enough permissions to access this page.</p>
                <Link to="/">Browse categories</Link>
            </>
        );

        const categoryList = (
            <>
                <ul>
                    {categories.map(category => {
                        return <li key={category._id}>{`${category.name} (${category.slug})`}</li>;
                    })}
                </ul>
            </>
        );

        const loggedInState = (
            <>
                <h1>Admin</h1>
                <h2>Add New Category</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <label className="label" htmlFor="name">
                            Name
                        </label>
                        <input
                            onChange={this.onChange}
                            value={this.state.name}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Interaction Design"
                            required
                        />
                    </div>
                    <div className={`form-field ${this.state.slugInvalid ? 'form-field--invalid' : ''}`}>
                        <label className="label" htmlFor="slug">
                            Slug (url friendly name)
                        </label>
                        <input
                            onChange={this.onChange}
                            value={this.state.slug}
                            type="text"
                            name="slug"
                            id="slug"
                            placeholder="interaction-design"
                            required
                        />
                    </div>

                    <button className="button" type="submit" id="submit">
                        Add Category
                    </button>
                </form>

                <h2>Categories</h2>
                {categoryList}
            </>
        );

        if (this.props.user.role !== AuthService.Role.Admin) {
            return restrictedState;
        }

        if (!this.props.user.username) {
            navigate('/login');

            return loggedOutState;
        }

        return loggedInState;
    }
}

Admin.propTypes = {
    categories: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    createCategory: PropTypes.func.isRequired
};
