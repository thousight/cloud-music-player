import React, { Component } from 'react';
import { Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';

import PlaylistItem from './PlaylistItem';
import playlistIcon from '../../img/playlist_play.svg';
import driveIcon from '../../img/GoogleDrive.png';
import arrow from '../../img/navigate_next.svg';

class SidebarContent extends Component {

  render() {
    return (
      <Accordion className="sidebar-content">
        {this.props.user.playlists ?
          Object.keys(this.props.user.playlists).map((key, index) => {
            return (
              <PlaylistItem
                key={index}
                playlistSongs={this.props.user.playlists[key]}
                eventKey={index}
                header={
                  <div className="sidebar-playlist-title">
                    <img className="sidebar-playlist-icon" alt="playlist icon" src={key === 'Google Drive Imports' ? driveIcon : playlistIcon} />
                    {key.length > 20 ? key.substring(0 ,20)+'...' : key}
                    <img className="sidebar-playlist-arrow" alt="Arrow icon" src={arrow} />
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
