import React from 'react';
import PropTypes from 'prop-types';
import * as BookShelf from './Bookshelf';

class BookMenu extends React.Component {
    state = {
        currentShelf: this.props.shelf
    };

    static propTypes = {
        onShelfChanged: PropTypes.func.isRequired,
        shelf: PropTypes.string.isRequired
    };

    handleChange = (event) => {
        this.setState({currentShelf: event.target.value});
        this.props.onShelfChanged(event.target.value);
    };

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.currentShelf} onChange={this.handleChange}>
                    <option value={BookShelf.NONE} disabled>Move to...</option>
                    <option value={BookShelf.CURRENTLY_READING}>Currently Reading</option>
                    <option value={BookShelf.WANT_TO_READ}>Want to Read</option>
                    <option value={BookShelf.READ}>Read</option>
                    <option value={BookShelf.NONE}>None</option>
                </select>
            </div>
        )
    }
}

export default BookMenu;