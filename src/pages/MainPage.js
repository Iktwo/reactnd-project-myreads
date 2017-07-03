import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Bookshelf from '../components/Bookshelf';
import * as BooksApi from '../BooksAPI';

class MainPage extends React.Component {
    fetchBooks() {
        console.log("Fetching Books");

        BooksApi.getAll().then((books) => {
            this.setState({books: books});
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
        const bookshelvesName = {currentlyReading: "Currently reading", wantToRead: "Want to read", read: "Read"};

        return (
            <div className="list-books">
                <Header/>
                <div className="list-books-content">
                    <div>
                        {this.state.bookshelves.map((shelf) =>
                            <Bookshelf
                                onBookChanged={() => this.fetchBooks()}
                                key={shelf} shelf={shelf} title={bookshelvesName[shelf]}
                                books={this.state.books.filter((book) => book.shelf === shelf)}/>
                        )}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>

        )
    }
}

export default MainPage