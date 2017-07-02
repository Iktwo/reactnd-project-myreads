import React from 'react';
import BookMenu from './BookMenu';
import PropTypes from 'prop-types';

class Book extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    };

    render() {
        const {title, author, thumbnail} = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: 'url(' + thumbnail + ')'
                        }}/>
                        <BookMenu/>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{author}</div>
                </div>
            </li>
        )
    }
}

export default Book;