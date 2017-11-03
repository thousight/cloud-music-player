import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import jsmediatags from 'jsmediatags';

import SidebarContent from './components/SidebarContent.js'
import MusicPlayer from './components/MusicPlayer.js'
import { setSidebarOpenState } from './redux/actions';
import singleNodeIcon from '../img/music_node.svg';

const mql = window.matchMedia(`(min-width: 768px)`);

class MusicPlayerPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: true,
      url: 'https://drive.google.com/uc?export=download&id=0B3-82hcS8hjnaUdUWGxwV19NM0k',
      cover: null,
      title: '',
      singer: '',
      album: ''
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.getMusicMetadata = this.getMusicMetadata.bind(this);
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
      xhr.onload = () => {
        jsmediatags.read(xhr.response, {
          onSuccess: tag => {
            console.log(tag.tags);
            this.setState({
              title: tag.tags.title,
              singer: tag.tags.artist,
              album: tag.tags.album,
              cover: tag.tags.picture ? `data:${tag.tags.picture.format};base64,${this.arrayBufferToBase64(tag.tags.picture.data)}`: null
            });
          },
          onError: error => {
            console.log(error);
          }
        })
      }
      xhr.send();
    }
  }

  arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array( buffer );
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
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
        <div className="player-page">
          <img className="player-page-cover"
            alt="cover"
            src={this.state.cover ? this.state.cover : singleNodeIcon}
            style={{padding: this.state.cover ? '0' : '10px'}} />
          <h3>{this.state.title}</h3>
          <h5>{this.state.singer}</h5>
          <h5>{this.state.album}</h5>
          <MusicPlayer />
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
