import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginPage from './LoginPage';
import ImportPage from './ImportPage';
import MusicPlayerPage from './MusicPlayerPage';
import Navbar from './components/Navbar';
import { userLogin } from './redux/actions';

class App extends Component {

  state = {
    isLoggedIn: false
  }

  componentWillMount() {
    require('google-client-api')().then(gapi => {
      gapi.load('auth2:client', () => {
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
            this.setState({isLoggedIn: true});
          } else {

          }
        }, error => {
          console.log(error);
          alert(error.details);
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
            <MusicPlayerPage />
          </div>
          :
          <LoginPage />
        }
      </div>
    );
  }
}
/*
// 1. Create the button
var button = document.createElement("button");
button.innerHTML = "select all";
// 2. Append somewhere
var body = document.getElementsByTagName("body")[0];
body.appendChild(button);
// 3. Add event handler
button.addEventListener ("click", function() {
  alert("did something");
});
*/


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
