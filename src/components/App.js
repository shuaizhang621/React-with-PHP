import React, { Component } from 'react';
import '../styles/App.css';
import { Main } from './Main';
import { Header } from './Header';

class App extends Component {

    // state = {
    //     searched: false,
    // }
    //
    // handleSearch = () => {
    //     this.setState({ searched: true });
    // }

    render() {
        return (
              <div className="App">
                  <Header/>
                  <Main className="main"/>
              </div>
        );
    }
}

export default App;
