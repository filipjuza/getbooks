// import './Categories.scss';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

export default class Categories extends React.Component {
    render() {
        const { isLoading, categories } = this.props.categories;
        let categoriesTemplate = <p>Loading...</p>;

        if (!isLoading && categories) {
            categoriesTemplate = categories.map(category => (
                <article id={category._id} key={category._id}>
                    <Link to={`/category/${category.slug}`}>
                        <h3>{category.name}</h3>
                    </Link>
                </article>
            ));
        }

        const welcomeMessage = <p>{`Welcome, ${this.props.user.username}.`}</p>;

        return (
            <>
                {this.props.user.username && welcomeMessage}
                <h2>Categories</h2>
                {categoriesTemplate}
            </>
        );
    }
}

Categories.propTypes = {
    categories: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};
