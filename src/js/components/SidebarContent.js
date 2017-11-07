import React, { Component } from 'react';
import { Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';

import PlaylistItem from './PlaylistItem';

import driveIcon from '../../img/GoogleDrive.png';
import playlistIcon from '../../img/playlist_play.svg';
import share from '../../img/share.svg';

class SidebarContent extends Component {
  handlePlaylistShareClick(event, playlistName, playlistSongs) {
    event.stopPropagation();
    console.log(playlistSongs);
  }

  render() {
    return (
      <Accordion className="sidebar-content">
        {this.props.user.playlists ?
          Object.keys(this.props.user.playlists).sort((a, b) => {
            // Keep Google Drive Imports on top
            if (a === 'Google Drive Imports' || b === 'Google Drive Imports') {
              return 1;
            }
            return -1;
          }).map((key, index) => {
            return (
              <PlaylistItem
                key={index}
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
                      onClick={e => this.handlePlaylistShareClick(e, key, this.props.user.playlists[key])} />
                  </div>
                }/>
              )})
              :
              <div />}
      </Accordion>
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
