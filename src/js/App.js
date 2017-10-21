import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import firebase from 'firebase';

import LoginPage from './LoginPage';
import ImportPage from './ImportPage';
import MusicPlayerPage from './MusicPlayerPage';
import NavigationBar from './components/NavigationBar';
import { userLogin, setFirebase, setGAPI, setPlaylists } from './redux/actions';

class App extends Component {

  componentWillMount() {
    const gapiConfig = {
      client_id: '864033579706-cig1gmgglj5q8ko8uocv8kkbpb4g46tv.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      api_key: 'AIzaSyDe81MXEotfiSTyJA_7EOvbtWhFKr93Y28',
      discovery_docs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
    }
    const firebaseConfig = {
      apiKey: "AIzaSyDe81MXEotfiSTyJA_7EOvbtWhFKr93Y28",
      authDomain: "cloud-music-player-23909.firebaseapp.com",
      databaseURL: "https://cloud-music-player-23909.firebaseio.com",
      projectId: "cloud-music-player-23909",
      storageBucket: "cloud-music-player-23909.appspot.com",
      messagingSenderId: "864033579706"
    }

    require('google-client-api')().then(gapi => {
      gapi.load('auth2:client', () => {
        gapi.auth2.init(gapiConfig).then(auth => {
          firebase.initializeApp(firebaseConfig);

          this.props.setGAPI(gapi)
          this.props.setFirebase(firebase)

          if (auth.isSignedIn.get()) {
            firebase.auth().signInWithCredential(
              firebase.auth.GoogleAuthProvider.credential(auth.currentUser.get().getAuthResponse().id_token)
            ).then(firebaseUser => {
              firebase.database().ref('/users/' + firebaseUser.uid + '/playlists').once('value').then(snapshot => {
                this.props.history.push(snapshot.val() ? '/player' : '/import');
                this.props.setPlaylists(snapshot.val());
              })
            }).catch(error => {
              console.log(error);
            });

            this.props.userLogin(auth.currentUser.get().getBasicProfile());
          }
        }, error => {
          console.log(error);
        })

      })
    });
  }

  render() {

    return (
      <div className="App">
        <NavigationBar />
        <Switch key={this.props.location.pathname} location={this.props.location}>
          <Route exact path="/" component={LoginPage} />
          <Route path="/player" component={MusicPlayerPage} />
          <Route path="/import" component={ImportPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: user => {
      dispatch(userLogin(user))
    },
    setFirebase: firebase => {
      dispatch(setFirebase(firebase))
    },
    setGAPI: gapi => {
      dispatch(setGAPI(gapi))
    },
    setPlaylists: playlists => {
      dispatch(setPlaylists(playlists))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
