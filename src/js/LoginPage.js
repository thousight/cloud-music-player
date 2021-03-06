import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { userLogin, setPlaylists } from './redux/actions';
import logo from '../img/logo.svg';

class LoginPage extends Component {

  handleGoogleSigninClick() {
    const { gapi, firebase } = this.props.packages;
    const gapiAuth = gapi.auth2.getAuthInstance();

    if (gapiAuth.isSignedIn.get()) {
      this.props.userLogin(gapiAuth.currentUser.get().getBasicProfile());
    } else {
      gapiAuth.signIn().then(user => {
        this.props.userLogin(user.getBasicProfile());
        firebase.auth().signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(user.getAuthResponse().id_token)
        ).then(firebaseUser => {
          let ref = firebase.database().ref('/users/' + firebaseUser.uid + '/playlists');

          // Reroute user if user is at '/'
          ref.once('value').then(snapshot => {
            if (this.props.history.location.pathname === '/' || !snapshot.val()) {
              this.props.history.push(snapshot.val() ? '/player' : '/import');
            }
          })

          // Listen for playlists change
          ref.on('value', snapshot => {
            this.props.setPlaylists(snapshot.val()); // gets executed every time playlists change
          })
        }).catch(error => {
          console.log(error);
        });
      });
    }
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

const mapDispatchToProps = dispatch => {
  return {
    userLogin: user => {
      dispatch(userLogin(user))
    },
    setPlaylists: playlists => {
      dispatch(setPlaylists(playlists))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
