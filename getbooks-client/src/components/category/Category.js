import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

export default class Category extends React.Component {
    async componentDidMount() {
        await this.props.fetchBooks(this.props.slug);
    }

    render() {
        const { books, categories, slug } = this.props;
        const category = categories.find(c => c.slug === slug);
        const mappedBooks = books.map(book => (
            <article id={book._id} key={book._id}>
                <Link to={`/book/${book.slug}`}>
                    <h3>{book.title}</h3>
                </Link>
            </article>
        ));

        return (
            <>
                <h2>{category ? category.name : ''}</h2>
                {mappedBooks}
            </>
        );
    }
}

Category.propTypes = {
    slug: PropTypes.string,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchBooks: PropTypes.func.isRequired
};

Category.defaultProps = {
    slug: null
};
