import React from 'react';
import './App.css';
import SearchPage from './pages/SearchPage';
import MainPage from './pages/MainPage';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
    render() {
        return (
            <div className="app">
                <Route
                    path="/search" render={() => (
                    <SearchPage/>
                )}
                />

                <Route
                    exact path="/" render={() => (
                    <MainPage/>
                )}
                />

            </div>
        )
    }
}

export default BooksApp
