import './LoginForm.scss';

import { navigate } from '@reach/router';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            formInvalid: false
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
            .login(this.state.username, this.state.password)
            .then(() => {
                navigate('/');
                this.setState({ username: '', password: '' });
            })
            .catch(e => {
                console.error(e);
                this.setState({ password: '', formInvalid: true });
            });
    }

    render() {
        return (
            <>
                <h1>Log in</h1>
                <form className={`form ${this.state.formInvalid ? 'form--invalid' : ''}`} onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <label className="label" htmlFor="username">
                            Username
                        </label>
                        <input
                            onChange={this.onChange}
                            value={this.state.username}
                            type="text"
                            name="username"
                            id="username"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label className="label" htmlFor="password">
                            Password
                        </label>
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            type="password"
                            name="password"
                            id="password"
                            required
                        />
                    </div>
                    <button className="button" type="submit" id="submit">
                        Log in
                    </button>
                </form>
            </>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
};
