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
                    <h2>{category.name}</h2>
                </Link>
            </article>
        ));

        return <>{mappedCategories}</>;
    }
}

Categories.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired
};
