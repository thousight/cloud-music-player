import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import LoginPage from './LoginPage';
import ImportPage from './ImportPage';
import MusicPlayerPage from './MusicPlayerPage';
import Navbar from './components/Navbar';
import { userLogin, updateCurrentRoute } from './redux/actions';

class App extends Component {

  componentWillMount() {
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
            this.props.dispatch(updateCurrentRoute('import'));
            this.props.history.push('/import');

          } else {
            // this.props.history.push('/signin');
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
        {this.props.user.name ? <Navbar /> : <div />}
        <Switch key={this.props.location.pathname} location={this.props.location}>
          <Route exact path="/" component={LoginPage} />
          <Route path="/player" component={MusicPlayerPage} />
          <Route path="/import" component={ImportPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(withRouter(App));
