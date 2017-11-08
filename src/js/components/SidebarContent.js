import React, { Component } from 'react';
import { Accordion, OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PlaylistItem from './PlaylistItem';

import add from '../../img/add-option.svg';
import back from '../../img/back.svg';
import driveIcon from '../../img/GoogleDrive.png';
import playlistIcon from '../../img/playlist_play.svg';
import playingBars from '../../img/bars.svg';
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

  navigateBackToImport(e) {
    e.stopPropagation();
    this.props.history.push('/import');
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

  // Shows song name with different length based on screen size
  getPlaylistNameString(name) {
    if (this.props.settings.isSidebarOpen) {
      return name.length > 18 ? name.substring(0, 15) + '...' : name;
    }
    return name.length > 20 ? name.substring(0, 17) + '...' : name;
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
        <div className="add-new-playlist-card-wrapper">
          <div className="add-new-playlist-card card" onClick={this.navigateBackToImport.bind(this)}>
            <img alt="Back icon" src={back} />
            <span>Import songs</span>
          </div>

          <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={playlistNamePopover}>
            <div className="add-new-playlist-card card"><img alt="Add icon" src={add} /><span>New playlist</span></div>
          </OverlayTrigger>
        </div>

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
                        alt="Playlist icon"
                        src={
                          this.props.user.currentlyPlayingPlaylistName === key ?
                            playingBars
                          :
                            (key === 'Google Drive Imports' ? driveIcon : playlistIcon)
                        } />

                      <span>{this.getPlaylistNameString(key)}</span>

                      <img className="sidebar-playlist-share"
                        alt="Share icon"
                        src={share}
                        onClick={e => this.handlePlaylistShare(e, key, this.props.user.playlists[key])} />
                    </div>
                  }/>
                )})
                :
                <div />}
        </Accordion>
      </div>
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

export default withRouter(connect(mapStateToProps)(SidebarContent));
