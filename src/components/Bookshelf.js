import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

export const NONE = "none";
export const CURRENTLY_READING = "currentlyReading";
export const WANT_TO_READ = "wantToRead";
export const READ = "read";

class Bookshelf extends React.Component {
    static propTypes = {
        shelf: PropTypes.string,
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onBookChanged: PropTypes.func
    };

    onBookChanged() {
        const {onBookChanged} = this.props;

        if (onBookChanged) {
            onBookChanged()
        }
    }

    render() {
        const {title, books} = this.props;

        let shelf = this.props.shelf;

        if (!shelf) {
            shelf = NONE;
        }

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books && books.map((book) => (
                            <Book key={book.id} id={book.id} title={book.title} author={book.authors[0]}
                                  shelf={shelf} onBookChanged={() => this.onBookChanged()}
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