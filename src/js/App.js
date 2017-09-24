import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginPage from './LoginPage';
import ImportPage from './ImportPage';
import MusicPlayerPage from './MusicPlayerPage';
import Navbar from './components/Navbar';
import { userLogin } from './redux/actions';
import '../css/App.css';

class App extends Component {

  state = {
    isLoggedIn: false
  }

  componentWillMount() {
    require('google-client-api')().then(gapi => {
      gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '864033579706-cig1gmgglj5q8ko8uocv8kkbpb4g46tv.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        }).then(auth => {
          if (auth.isSignedIn.get()) {
            userLogin(auth.currentUser.get().getBasicProfile());
            console.log(this.props.user);
            this.setState({isLoggedIn: true})
          } else {

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
      <div className="App">
        {
          this.state.isLoggedIn ? // is user logged in
          <div>
            <Navbar />
            <ImportPage />
          </div>
          :
          <LoginPage />
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
