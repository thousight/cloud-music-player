import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';

import { userLogin } from './redux/actions';
import logo from '../img/logo.svg';

class LoginPage extends Component {

  handleGoogleSigninClick() {
    window.gapi.load('auth2:client', () => {
      window.gapi.auth2.init({
        client_id: '864033579706-cig1gmgglj5q8ko8uocv8kkbpb4g46tv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        api_key: 'AIzaSyDe81MXEotfiSTyJA_7EOvbtWhFKr93Y28',
        discovery_docs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
      }).then(auth => {
        if (auth.isSignedIn.get()) {
          userLogin(auth.currentUser.get().getBasicProfile());
          console.log(this.props.user);
        } else {
          auth.signIn().then(user => {
            userLogin(user.getBasicProfile());
            // Check if user is new user or not and navigate
            // user to the corresponding page
            this.props.history.push('/import');
          });
        }
      }, error => {
        console.log(error);
        alert(error.details)
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

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		userLogin
	}, dispatch);
}

const mapStateToProps = state => {
	return {
    user: state.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
