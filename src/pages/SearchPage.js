import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksApi from '../BooksAPI';
import debounce from '../utils/debounce';
import Book from '../components/Book';

class SearchPage extends React.Component {
    state = {
        query: '',
        results: []
    };

    searchBooks(query) {
        if (query && query !== "") {
            BooksApi.search(query).then((results) => {
                if (!results.hasOwnProperty("error")) {
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
        debounce(() => this.searchBooks(query), 1200, 300)
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
                                <Book key={book.id} title={book.title}
                                      author={book.authors === undefined ? "Unknown" : book.authors[0]}
                                      thumbnail={book.imageLinks.thumbnail}/>
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