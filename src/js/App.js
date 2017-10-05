import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

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
          api_key: 'AIzaSyDe81MXEotfiSTyJA_7EOvbtWhFKr93Y28'
        }).then(auth => {
          if (auth.isSignedIn.get()) {
            userLogin(auth.currentUser.get().getBasicProfile());
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
        {this.state.isLoggedIn ? <Navbar /> : <div />}
        <Switch key={this.props.location.pathname} location={this.props.location}>
          <Route exact path="/" component={this.state.isLoggedIn ? ImportPage : LoginPage} />
          <Route path="/import" component={ImportPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(App));
