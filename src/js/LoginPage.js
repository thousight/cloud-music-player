import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import GoogleLogin from 'react-google-login';

import { userLogin } from './redux/actions';
import logo from '../img/logo.svg';
import '../css/LoginPage.css';

class LoginPage extends Component {

  handleGoogleSigninSuccess(res) {
    userLogin(res);
    localStorage.setItem('cmp-accessToken', res.accessToken);
  }

  handleGoogleSigninFailure(res) {
    console.log(res);
    alert(res.error + ': ' + res.details)
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-page-title-wrapper">
          <img src={logo} className="login-page-logo" alt="logo" />
          <h1>Cloud Music Player</h1>
        </div>

        <GoogleLogin
          className="google-signin-button"
          clientId="864033579706-cig1gmgglj5q8ko8uocv8kkbpb4g46tv.apps.googleusercontent.com"
          buttonText=""
          onSuccess={this.handleGoogleSigninSuccess}
          onFailure={this.handleGoogleSigninFailure} />

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		userLogin
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginPage);
