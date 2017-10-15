import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { userLogin } from './redux/actions';
import logo from '../img/logo.svg';

class LoginPage extends Component {

  handleGoogleSigninClick() {
    require('google-client-api')().then(gapi => {
      gapi.load('auth2:client', () => {
        gapi.auth2.init({
          client_id: '864033579706-cig1gmgglj5q8ko8uocv8kkbpb4g46tv.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          api_key: 'AIzaSyDe81MXEotfiSTyJA_7EOvbtWhFKr93Y28',
          discovery_docs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
          scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
        }).then(auth => {
          if (auth.isSignedIn.get()) {
            this.props.dispatch(userLogin(auth.currentUser.get().getBasicProfile()));
          } else {
            auth.signIn().then(user => {
              this.props.dispatch(userLogin(user.getBasicProfile()));
              this.props.history.push('/import');
            });
          }
        }, error => {
          console.log(error);
          alert(error.details)
        })
      })
    });
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
    user: state.user
	}
}

export default connect(mapStateToProps)(withRouter(LoginPage));
