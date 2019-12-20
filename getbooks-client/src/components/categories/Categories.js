// import './Categories.scss';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

export default class Categories extends React.Component {
    render() {
        const { categories } = this.props;

        const mappedCategories = categories.map(category => (
            <article id={category._id} key={category._id}>
                <Link to={`/category/${category.slug}`}>
                    <h3>{category.name}</h3>
                </Link>
            </article>
        ));

        return (
            <>
                <nav>
                    <ul>
                        <li>
                            <Link to="/login">Log in</Link>
                        </li>
                        <li>
                            <Link to="/add-book">Post a book for sale</Link>
                        </li>
                    </ul>
                </nav>
                <h2>Categories</h2>
                {mappedCategories}
            </>
        );
    }
}

Categories.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired
};
