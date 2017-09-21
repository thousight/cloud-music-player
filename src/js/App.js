import React, { Component } from 'react';

import LoginPage from './LoginPage';
import ImportPage from './ImportPage';
import MusicPlayerPage from './MusicPlayerPage';
import Navbar from './components/Navbar';
import '../css/App.css';

class App extends Component {

  componentWillMount() {
    // Check if accessToken is in localStorage
    let accessToken = localStorage.getItem('cmp-accessToken');
    if (!!accessToken) {
      
    } else {

    }
  }

  render() {
    return (
      <div className="App">
        <LoginPage />
      </div>
    );
  }
}

export default App;
