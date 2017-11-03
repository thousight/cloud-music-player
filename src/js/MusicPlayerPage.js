import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import jsmediatags from 'jsmediatags';

import SidebarContent from './components/SidebarContent.js'
import MusicPlayer from './components/MusicPlayer.js'
import { setSidebarOpenState } from './redux/actions';

const mql = window.matchMedia(`(min-width: 768px)`);

class MusicPlayerPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: true,
      url: 'https://drive.google.com/uc?export=download&id=0B3-82hcS8hjnaUdUWGxwV19NM0k'
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql, sidebarDocked: mql.matches });
  }

  componentDidMount() {
    let sidebarOverlay = document.getElementsByClassName('playlists-sidebar-overlay').item(0);
    sidebarOverlay.onclick = () => {
      this.props.setSidebarOpenState(false);
    }
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  // When screen size changes from sm to md(mql.matches = true) and from md to sm(mql.matches = false)
  mediaQueryChanged() {
    this.setState({sidebarDocked: this.state.mql.matches});
    this.props.setSidebarOpenState(false);
  }

  getMusicMetadata() {
      if (this.props.packages.gapi && this.props.user.currentlyPlayingMusicId) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://www.googleapis.com/drive/v3/files/${this.props.user.currentlyPlayingMusicId}?alt=media`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${this.props.packages.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token}`)
        xhr.withCredentials = true;
        xhr.responseType = 'blob';
        xhr.onload = function() {
          jsmediatags.read(xhr.response, {
            onSuccess: tag => {
              console.log(tag);
            },
            onError: error => {
              console.log(error);
            }
          })
          console.log(xhr.response);
        }
        xhr.send();
      }
  }

  render() {
    // Sidebar content stuff
    const sidebarContent = (<div style={{ width: '300px' }}>
      <SidebarContent />
    </div>);

    this.getMusicMetadata();

    return (
      <Sidebar
        sidebar={sidebarContent}
        sidebarClassName="playlists-sidebar"
        overlayClassName="playlists-sidebar-overlay"
        open={this.props.settings.isSidebarOpen}
        docked={this.state.sidebarDocked} >
        <div className="player-page container">
          <Row>
            <Col md={6}>
              <MusicPlayer />
            </Col>
          </Row>
        </div>
      </Sidebar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    packages: state.packages,
    settings: state.settings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSidebarOpenState: bool => {
      dispatch(setSidebarOpenState(bool))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicPlayerPage));
