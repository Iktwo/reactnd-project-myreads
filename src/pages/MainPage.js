import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Bookshelf from '../components/Bookshelf';
import PropTypes from 'prop-types';

class MainPage extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        bookshelves: PropTypes.array.isRequired,
        onBookChanged: PropTypes.func.isRequired
    };

    render() {
        const bookshelvesName = {currentlyReading: "Currently reading", wantToRead: "Want to read", read: "Read"};

        const {books, bookshelves, onBookChanged} = this.props;

        return (
            <div className="list-books">
                <Header/>
                <div className="list-books-content">
                    <div>
                        {bookshelves.map((shelf) =>
                            <Bookshelf
                                onBookChanged={() => onBookChanged()}
                                key={shelf} shelf={shelf} title={bookshelvesName[shelf]}
                                books={books.filter((book) => book.shelf === shelf)}/>
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