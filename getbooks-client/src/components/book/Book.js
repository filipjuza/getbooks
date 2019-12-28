import './Book.scss';

import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

export default class Book extends React.Component {
    async componentDidMount() {
        await this.props.fetchBookBySlug(this.props.slug);
    }

    render() {
        const { isLoading, book } = this.props.bookDetail;
        let bookTemplate = <p>Loading...</p>;

        if (!isLoading && book) {
            bookTemplate = (
                <article id={book._id} className="book-detail">
                    <h2>{book.title}</h2>
                    <img src={book.image} alt="Book" className="book-detail__image" />
                    <ul>
                        <li>{`Category: ${book.category.name}`}</li>
                        <li>{`Author: ${book.author}`}</li>
                        <li>{`Price: ${book.price} DKK`}</li>
                        <li>{`Posted by: ${book.user.username} (${book.user.email})`}</li>
                    </ul>
                </article>
            );
        }

        return (
            <>
                {!isLoading && book && (
                    <Link to={`/category/${book.category.slug}`}>{`<- back to ${book.category.name}`}</Link>
                )}

                {bookTemplate}
            </>
        );
    }
}

Book.propTypes = {
    slug: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    bookDetail: PropTypes.object.isRequired,
    fetchBookBySlug: PropTypes.func.isRequired
};

Book.defaultProps = {
    slug: null
};
