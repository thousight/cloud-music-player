import React, { Component } from 'react';
import { Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';

import PlaylistItem from './PlaylistItem';
import CircularButton from './CircularButton';

import add from '../../img/add.svg';
import driveIcon from '../../img/GoogleDrive.png';
import playlistIcon from '../../img/playlist_play.svg';
import share from '../../img/share.svg';

class SidebarContent extends Component {

  handlePlaylistShare(event, playlistName, playlistSongs) {
    event.stopPropagation();
    console.log('handlePlaylistShare(): ' + playlistName);
  }

  handleAddPlaylistButtonClick() {
    console.log('handleAddPlaylistButtonClick()');
  }

  render() {
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
        <CircularButton
          className="sidebar-add-playlist-button"
          onClick={this.handleAddPlaylistButtonClick.bind(this)}
          icon={add}
          lg />
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
