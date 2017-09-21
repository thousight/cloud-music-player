import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

import logo from '../img/logo.svg';
import '../css/App.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.googleLoginOnSuccess = this.googleLoginOnSuccess.bind(this);
    this.googleLoginOnFailure = this.googleLoginOnFailure.bind(this);
  }

  googleLoginOnSuccess(res) {
    localStorage.setItem('cmp-accessToken', res.accessToken);
  }

  googleLoginOnFailure(res) {
    console.log(res);
    alert(res.error + ': ' + res.details)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <GoogleLogin
          className="google-signin-button"
          clientId="864033579706-cig1gmgglj5q8ko8uocv8kkbpb4g46tv.apps.googleusercontent.com"
          buttonText=""
          onSuccess={this.googleLoginOnSuccess}
          onFailure={this.googleLoginOnFailure}
        />

      </div>
    );
  }
}

export default App;
