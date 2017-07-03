import React from 'react';
import './App.css';
import SearchPage from './pages/SearchPage';
import MainPage from './pages/MainPage';
import { Route } from 'react-router-dom';
import * as BooksApi from './BooksAPI';

class BooksApp extends React.Component {
    fetchBooks() {
        BooksApi.getAll().then((books) => {
            this.setState({books: books});
            // Dynamically generate shelves from the info in the books
            this.setState({bookshelves: [...new Set(books.map(book => book.shelf))]});
        });
    };

    componentDidMount() {
        this.fetchBooks()
    };

    state = {
        books: [],
        bookshelves: []
    };

    render() {
        let {books, bookshelves} = this.state;

        return (
            <div className="app">
                <Route
                    path="/search" render={() => (
                    <SearchPage books={books} bookshelves={bookshelves} onBookChanged={() => this.fetchBooks()}/>
                )}
                />

                <Route
                    exact path="/" render={() => (
                    <MainPage books={books} bookshelves={bookshelves} onBookChanged={() => this.fetchBooks()}/>
                )}
                />

            </div>
        )
    }
}

export default BooksApp
