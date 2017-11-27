import React, { Component } from 'react';
import { Accordion, OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';

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
    submitButtonBackground: '#888888',
    sharingError: null
  }

  // Storing added playlists, purposely not using states
  receivedSharingPlaylist;
  receivedSharingPlaylistName;

  componentDidMount() {
    if (this.props.history.location.search.includes('sharePlaylist')) {
      let playlistStr = decodeURIComponent(window.location.href);
      this.receivedSharingPlaylistName = playlistStr.substring(playlistStr.indexOf('sharePlaylist=') + 14, playlistStr.indexOf('&data='));
      this.receivedSharingPlaylist = JSON.parse(playlistStr.substring(playlistStr.indexOf('&data=') + 6, playlistStr.length));
    }
  }

  componentDidUpdate() {
    if (this.receivedSharingPlaylist
      && this.receivedSharingPlaylistName
      && this.props.packages.firebase
      && Object.keys(this.props.user.playlists).length > 0) {

        // Set null to the received info to prevent these code being called again
        let tempPlaylist = this.receivedSharingPlaylist;
        let tempPlaylistName = this.receivedSharingPlaylistName
        this.receivedSharingPlaylistName = null;
        this.receivedSharingPlaylist = null;

        this.props.packages.firebase.database()
        .ref(`/users/${this.props.packages.firebase.auth().getUid()}/playlists/${
            (tempPlaylistName in this.props.user.playlists) ? (tempPlaylistName += ' from share') : tempPlaylistName
          }`)
        .set(tempPlaylist)
        .then(() => {
          toast.success(`${tempPlaylistName} has added to your playlist`, {closeButton: false});
          window.history.pushState({}, document.title, '/player');
        })
      }
    }

    handlePlaylistShare(event, playlistName, playlistSongs) {
      event.stopPropagation();
      let playlistArray = Object.keys(playlistSongs);
      let copyResult = this.copyUrl(playlistName, playlistSongs);

      // Request sharing permission for each of files
      Promise.all(playlistArray.map(key => {
        return this.props.packages.gapi.client.request({
          path: `https://www.googleapis.com/drive/v3/files/${key}/permissions`,
          method: 'POST',
          body: {
            role: 'reader',
            type: 'anyone',
            allowFileDiscovery: true
          }
        }).then(
          success => {
            // Nothing to do here yet
          },
          error => {
            this.setState({sharingError: error.result.error.message});
          }
        )
      })).then(() => {
        if (copyResult) {
          toast.success(
            `Successfully copy sharing url to clipboard${this.state.sharingError ?
              ', however, some songs might not be able to share'
              : ''}. Paste the url on the browser to add playlist.`,
              {closeButton: false}
            );
            this.setState({sharingError: null});
          } else {
            toast.error('Fail copying sharing link to clipboard, please try again', {closeButton: false});
          }
        })
      }

      copyUrl(playlistName, playlistSongs) {
        // Generated URL based on environment
        let url = `${process.env.NODE_ENV === 'development' ?
        'http://localhost:3000'
        :
        'http://cloud-music-player.herokuapp.com'
      }/player?sharePlaylist=${playlistName}&data=${JSON.stringify(playlistSongs)}`;

      // Copy URL to clipboard
      let textArea = document.createElement("textarea");
      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = 0;
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();

      let res = document.execCommand('copy');

      document.body.removeChild(textArea);
      return res;
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
        this.setState({playlistName: '', submitButtonBackground: '#888888'});
        document.getElementById('NEW_PLAYLIST_POPOVER').style.display = "none";
        let newLocation = this.props.packages.firebase.database()
        .ref(`/users/${this.props.packages.firebase.auth().currentUser.uid}/playlists/${this.state.playlistName}`);
        //let obj = {};

      //  newLocation.set(obj).then(() => {
        //  this.props.history.push('/player');
      //  })
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
                <span>{this.props.settings.isSidebarOpen ? 'Import' : 'Import songs'}</span>
              </div>

              <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={playlistNamePopover}>
                <div className="add-new-playlist-card card"><img alt="Add icon" src={add} /><span>New playlist</span></div>
              </OverlayTrigger>
            </div>

            <Accordion className="sidebar-content">
              {this.props.user.playlists ?
                Object.keys(this.props.user.playlists).sort((a, b) => {
                  // Keep Google Drive Imports on top
                  return (a === 'Google Drive Imports' ) ? a > b : a < b;
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
