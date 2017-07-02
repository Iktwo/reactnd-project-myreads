import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class Bookshelf extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    };

    render() {
        const {title, books} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <Book key={book.id} title={book.title} author={book.authors[0]}
                                  thumbnail={book.imageLinks.thumbnail}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf