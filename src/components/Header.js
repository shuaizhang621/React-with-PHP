import React from 'react';
import logo from '../assets/images/book.svg';

export class Header extends React.Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Rent a book</h1>
            </header>
        );
    }
}