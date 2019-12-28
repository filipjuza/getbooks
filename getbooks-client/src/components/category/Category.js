import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

export default class Category extends React.Component {
    async componentDidMount() {
        await this.props.fetchBooks(this.props.slug);
    }

    render() {
        const { slug } = this.props;
        const { categories } = this.props.categories;
        const { isLoading, books } = this.props.books;
        let category = null;
        let bookList = <p>Laoding...</p>;

        if (!isLoading && categories) {
            category = categories.find(c => c.slug === slug);

            bookList = books.map(book => (
                <article id={book._id} key={book._id}>
                    <Link to={`/book/${book.slug}`}>
                        <h3>{book.title}</h3>
                    </Link>
                </article>
            ));
        }

        return (
            <>
                <h2>{category ? category.name : '...'}</h2>
                {bookList}
            </>
        );
    }
}

Category.propTypes = {
    slug: PropTypes.string,
    books: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    fetchBooks: PropTypes.func.isRequired
};

Category.defaultProps = {
    slug: null
};
