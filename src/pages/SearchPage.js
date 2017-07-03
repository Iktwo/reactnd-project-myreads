import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksApi from '../BooksAPI';
import debounce from '../utils/debounce';
import Book from '../components/Book';
import PropTypes from 'prop-types';
import * as BookShelf from '../components/Bookshelf';

class SearchPage extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        bookshelves: PropTypes.array.isRequired,
        onBookChanged: PropTypes.func.isRequired
    };

    state = {
        query: '',
        results: []
    };

    searchBooks(query) {
        if (query && query !== "") {
            BooksApi.search(query).then((results) => {
                if (!results.hasOwnProperty("error")) {
                    // Since the API seems to NOT return the actual current state, we need to look into the current books
                    // and set the actual shelf, this would be slow if there were a lot of books, it is acceptable for
                    // now.

                    const getShelf = book => {
                        let shelf = BookShelf.NONE;
                        let match = this.props.books.find((b) => (b.id === book.id));

                        if (match) {
                            shelf = match.shelf
                        }

                        return shelf;

                    };

                    results = results.map(book => ({...book, shelf: getShelf(book)}));

                    this.setState({results: results});
                } else {
                    this.setState({results: []});
                }
            });
        } else {
            this.setState({results: []});
        }
    };

    updateQuery = (query) => {
        debounce(() => this.searchBooks(query), 700, 175)
    };

    render() {
        const {results} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                               onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {(results.length > 0 && (
                        <ol className="books-grid">
                            {results.map((book) => (
                                <Book key={book.id} id={book.id} title={book.title}
                                      onBookChanged={() => this.props.onBookChanged()} shelf={book.shelf}
                                      author={book.authors === undefined ? "Unknown" : book.authors[0]}
                                      thumbnail={book.imageLinks !== undefined ? book.imageLinks.thumbnail : "http://via.placeholder.com/128x193?text=No%20Cover"}/>
                            ))}
                        </ol>
                    ))}
                    {(results.length === 0 && (
                        <div>
                            No results.
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default SearchPage;