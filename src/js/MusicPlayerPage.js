import React, { Component } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import jsmediatags from 'jsmediatags';
import { toast } from 'react-toastify';

import SidebarContent from './components/SidebarContent.js'
import MusicPlayer from './components/MusicPlayer.js'
import { setSidebarOpenState, setPlaylists } from './redux/actions';

import singleNodeIcon from '../img/music_node.svg';
import add from '../img/add-option.svg';

const mql = window.matchMedia(`(min-width: 768px)`);

class MusicPlayerPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: true,
      cover: null,
      title: '',
      singer: '',
      album: ''
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.getMusicMetadata = this.getMusicMetadata.bind(this);
    this.errorTimeout = null;
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
            xhr.abort();
            this.setState({
              title: tag.tags.title,
              singer: tag.tags.artist,
              album: tag.tags.album,
              cover: tag.tags.picture ? `data:${tag.tags.picture.format};base64,${this.arrayBufferToBase64(tag.tags.picture.data)}`: null
            });
          },
          onError: error => {
            if (this.props.user.currentlyPlayingMusicId) {
              clearTimeout(this.errorTimeout);

              this.errorTimeout = setTimeout(() => {
                let filename = this.props.user.playlists[this.props.user.currentlyPlayingPlaylistName][this.props.user.currentlyPlayingMusicId];
                toast.error(`Unable to decode ${filename}`, {closeButton: false});
              }, 1000)
            }
          }
        })
      }
      xhr.send();
    }
  }

  arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  handleOptionAddToPlaylistClick(addToPlaylistName) {
    let addToPlaylist = this.props.user.playlists[addToPlaylistName];
    addToPlaylist[this.props.user.currentlyPlayingMusicId] = this.props.user.playlists[this.props.user.currentlyPlayingPlaylistName][this.props.user.currentlyPlayingMusicId];

    this.props.packages.firebase.database()
      .ref(`/users/${this.props.packages.firebase.auth().getUid()}/playlists/${addToPlaylistName}`)
      .set(addToPlaylist).then(() => {
        document.getElementById('ADD_CURRENT_SONG_POPOVER').style.display = "none";
      });
  }

  render() {
    // Sidebar content stuff
    const sidebarContent = (<div style={{ width: this.state.sidebarDocked ? '350px' : '300px' }}>
      <SidebarContent />
    </div>);

    // Popover showing all playlists user can add the song to
    const playlistsPopover = (
      <Popover title="Add to" id="ADD_CURRENT_SONG_POPOVER">
        {this.props.user.playlists ?
          Object.keys(this.props.user.playlists).map((playlistName, index) => {
          // Filter out current playlist or playlists that contain the song
          return (
              this.props.playlistName !== playlistName
              && !(this.props.user.currentlyPlayingMusicId in this.props.user.playlists[playlistName])
              && playlistName !== 'Google Drive Imports'
          ) ?
            <div className="popover-playlist"
              onClick={e => this.handleOptionAddToPlaylistClick(playlistName)}
              key={index}>
              {playlistName}
            </div>
           :
           null ;
        })
      : null}
      </Popover>
    );

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
          {
            this.props.user.currentlyPlayingMusicId.length > 0 ?
              <OverlayTrigger trigger="click" rootClose placement="top" overlay={playlistsPopover}>
                <img className="add-current-song-button"
                  src={add}
                  alt="Add current song button" />
              </OverlayTrigger>
             :
            null
          }
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
    setSidebarOpenState: bool => dispatch(setSidebarOpenState(bool)),
    setPlaylists: playlists => dispatch(setPlaylists(playlists))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicPlayerPage));
