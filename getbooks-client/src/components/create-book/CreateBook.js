import { navigate } from '@reach/router';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';

import AuthService from '../../services/auth.service';

export default class CreateBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            author: '',
            price: '',
            slug: '',
            // TODO: Get default value from available categories
            category: 'javascript',
            image: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.createBook({ ...this.state });
        this.setState({ title: '', author: '', price: '', image: '', category: 'javascript' });
    }

    render() {
        if (!AuthService.isLoggedIn()) {
            navigate('/login');
        }

        const categoryOptions = this.props.categories
            ? this.props.categories.map(category => (
                  <option value={category.slug} key={category.slug}>
                      {category.name}
                  </option>
              ))
            : '';

        return (
            <>
                <h1>Post a book for sale</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <label className="label" htmlFor="title">
                            Title
                        </label>
                        <input
                            onChange={this.onChange}
                            value={this.state.title}
                            type="text"
                            name="title"
                            id="title"
                            placeholder="The art of hygge"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label className="label" htmlFor="author">
                            Author
                        </label>
                        <input
                            onChange={this.onChange}
                            value={this.state.author}
                            type="text"
                            name="author"
                            id="author"
                            placeholder="Albert Camus"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label className="label" htmlFor="price">
                            Price
                        </label>
                        <input
                            onChange={this.onChange}
                            value={this.state.price}
                            type="number"
                            name="price"
                            id="price"
                            placeholder="399"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label className="label" htmlFor="slug">
                            Slug (url friendly name)
                        </label>
                        <input
                            onChange={this.onChange}
                            value={this.state.slug}
                            type="text"
                            name="slug"
                            id="slug"
                            placeholder="the-serenity-of-suffering-399"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label className="label" htmlFor="image">
                            Image
                        </label>
                        <input
                            onChange={this.onChange}
                            value={this.state.image}
                            type="url"
                            name="image"
                            id="image"
                            placeholder="Image URL"
                        />
                    </div>
                    <div className="form-field">
                        <label className="label" htmlFor="category">
                            Category
                        </label>
                        <select
                            onChange={this.onChange}
                            value={this.state.category}
                            type="url"
                            name="category"
                            id="category"
                            required
                        >
                            {categoryOptions}
                        </select>
                    </div>

                    <button className="button" type="submit" id="submit">
                        Post book
                    </button>
                </form>
            </>
        );
    }
}

CreateBook.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    createBook: PropTypes.func.isRequired
};