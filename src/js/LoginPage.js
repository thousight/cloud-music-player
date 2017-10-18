import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { userLogin } from './redux/actions';
import logo from '../img/logo.svg';

class LoginPage extends Component {

  handleGoogleSigninClick() {
    const { gapi, firebase } = this.props.packages;
    const auth = gapi.auth2.getAuthInstance();

    if (auth.isSignedIn.get()) {
      this.props.dispatch(userLogin(auth.currentUser.get().getBasicProfile()));
    } else {
      auth.signIn().then(user => {
        this.props.dispatch(userLogin(user.getBasicProfile()));
      });
    }
    this.props.history.push('/import');
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-page-title-wrapper">
          <img src={logo} className="login-page-logo" alt="logo" />
          <h1>Cloud Music Player</h1>
        </div>

        <Button className="google-signin-button" onClick={this.handleGoogleSigninClick.bind(this)} />

      </div>
    );
  }
}

const mapStateToProps = state => {
	return {
    user: state.user,
    packages: state.packages
	}
}

export default withRouter(connect(mapStateToProps)(LoginPage));
