import React, { Component } from 'react';
import { Accordion, OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';

import PlaylistItem from './PlaylistItem';
import CircularButton from './CircularButton';

import add from '../../img/add.svg';
import driveIcon from '../../img/GoogleDrive.png';
import playlistIcon from '../../img/playlist_play.svg';
import share from '../../img/share.svg';

class SidebarContent extends Component {

  state = {
    playlistName: '',
    playlistNameError: '',
    submitButtonBackground: '#888888'
  }

  handlePlaylistShare(event, playlistName, playlistSongs) {
    event.stopPropagation();
    console.log('handlePlaylistShare(): ' + playlistName);
  }

  handlePlaylistNameChange(name) {
    this.setState({playlistName: name});
    if (name.length >= 30) {
      this.setErrorState('Playlist name is too long')
    } else if (name === 'Google Drive Imports') {
      this.setErrorState('Please do not use a predefined name')
    } else if (name in this.props.user.playlists) {
      this.setErrorState('Playlist exists')
    } else if (name.length === 0) {
      this.setState({playlistNameError: '', submitButtonBackground: '#888888'});
    } else {
      this.setState({playlistNameError: '', submitButtonBackground: '#36A9F7'});
    }
  }

  setErrorState(message) {
    this.setState({
      playlistNameError: message,
      submitButtonBackground: '#E53935'
    });
  }

  handlePlaylistNameConfirm() {
    if (this.state.playlistName.length > 0 && this.state.playlistNameError.length === 0) {
      console.log(this.state.playlistName);
      this.setState({playlistName: '', submitButtonBackground: '#888888'});
      document.getElementById('NEW_PLAYLIST_POPOVER').style.display = "none";
    }
  }

  render() {
    const playlistNamePopover = (
      <Popover title="Add new playlist" id="NEW_PLAYLIST_POPOVER">
        <input className="new-playlist-input"
          onChange={e => this.handlePlaylistNameChange(e.target.value)}
          value={this.state.playlistName}
          style={{
            borderBottomColor: this.state.playlistNameError.length > 0 ? '#E53935' : '#36A9F7',
            color: this.state.playlistNameError.length > 0 ? '#E53935' : '#36A9F7'
          }}/>
        {
          this.state.playlistNameError.length > 0 ?
            <p className="new-playlist-input-error">{this.state.playlistNameError}</p>
          :
            null
        }
        <button className="new-playlist-input-confirm"
          style={{backgroundColor: this.state.submitButtonBackground}}
          onClick={this.handlePlaylistNameConfirm.bind(this)}>
          Confirm
        </button>
      </Popover>
    );

    return (
      <div>
        <Accordion className="sidebar-content">
          {this.props.user.playlists ?
            Object.keys(this.props.user.playlists).sort((a, b) => {
              // Keep Google Drive Imports on top
              return (a === 'Google Drive Imports' || b === 'Google Drive Imports') ? 1 : -1;
            }).map((key, index) => {
              return (
                <PlaylistItem
                  key={index}
                  playlistName={key}
                  playlistSongs={this.props.user.playlists[key]}
                  eventKey={index}
                  header={
                    <div className="sidebar-playlist-title">
                      <img className="sidebar-playlist-icon"
                        alt="playlist icon"
                        src={key === 'Google Drive Imports' ? driveIcon : playlistIcon} />

                      {key.length > 20 ? key.substring(0 ,20)+'...' : key}

                      <img className="sidebar-playlist-share"
                        alt="Arrow icon"
                        src={share}
                        onClick={e => this.handlePlaylistShare(e, key, this.props.user.playlists[key])} />
                    </div>
                  }/>
                )})
                :
                <div />}
        </Accordion>

        <OverlayTrigger trigger="click" rootClose placement="top" overlay={playlistNamePopover}>
          <CircularButton
            className="sidebar-add-playlist-button"
            icon={add}
            lg />
        </OverlayTrigger>
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

export default connect(mapStateToProps)(SidebarContent);
