import React from 'react';
import BookMenu from './BookMenu';
import PropTypes from 'prop-types';
import * as BookShelf from './Bookshelf';
import * as BooksApi from '../BooksAPI';

class Book extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        onBookChanged: PropTypes.func,
        shelf: PropTypes.string
    };

    shelfChanged(newShelf) {
        const {onBookChanged} = this.props;

        if (onBookChanged) {
            BooksApi.update({id: this.props.id}, newShelf).then(() => {
                    onBookChanged();
                }
            );
        }
    }

    render() {
        const {title, author, thumbnail} = this.props;

        let shelf = this.props.shelf;

        if (!shelf) {
            shelf = BookShelf.NONE;
        }

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: 'url(' + thumbnail + ')'
                        }}/>
                        <BookMenu shelf={shelf} onShelfChanged={(newShelf) => this.shelfChanged(newShelf)}/>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{author}</div>
                </div>
            </li>
        )
    }
}

export default Book;