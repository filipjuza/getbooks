import './Navbar.scss';

import { Link, navigate } from '@reach/router';
import { PropTypes } from 'prop-types';
import React from 'react';

export default class Navbar extends React.Component {
    handleLogout() {
        this.props.logout();
        navigate('/');
    }

    render() {
        return (
            <>
                <nav className="navbar">
                    <Link to="/" className="navbar__logo">
                        getbooks.now
                    </Link>
                    <ul className="navbar__list">
                        {this.props.user.username ? (
                            <>
                                <li className="navbar__item">
                                    <Link to="/add-book">Post a book for sale</Link>
                                </li>
                                <li className="navbar__item">
                                    <button
                                        onClick={() => this.handleLogout()}
                                        className="button button--small"
                                        type="button"
                                    >
                                        Log out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="navbar__item">
                                <Link to="/login">Log in</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </>
        );
    }
}

Navbar.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};
