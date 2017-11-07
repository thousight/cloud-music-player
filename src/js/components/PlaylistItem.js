import React, { Component } from 'react';
import { Panel, OverlayTrigger, Popover } from 'react-bootstrap';
import { setPlayingMusicId } from '../redux/actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import add from '../../img/add-option.svg';
import remove from '../../img/clear-option.svg';
import singleNodeIcon from '../../img/music_node.svg';
import playingBars from '../../img/bars.svg';

class PlaylistItem extends Component {

  state = {
    currentlyOpenedPopover: ''
  }

  handleOptionAddClick(event, songKey) {
    event.stopPropagation();
    this.setState({currentlyOpenedPopover: `Popover${songKey}`});
  }

  handleOptionAddToPlaylistClick(event, playlistName) {
    document.getElementById(this.state.currentlyOpenedPopover).style.display = "none"; // Hide opened popover

  }

  handleOptionDelete(event, songKey) {
    event.stopPropagation(); // Prevent calling parent onClick()

  }

  render() {
    const playlistsPopover = (songKey) => {
      return (
        <Popover title="Add to" id={`Popover${songKey}`}>
          {Object.keys(this.props.user.playlists).sort((a, b) => {
            // Keep Google Drive Imports on top
            if (a === 'Google Drive Imports' || b === 'Google Drive Imports') {
              return 1;
            }
            return -1;
          }).map((playlistName, index) => {
            return (
              <div onClick={e => this.handleOptionAddToPlaylistClick(e, playlistName)} key={index}>
                {playlistName}
              </div>
            )
          })}
        </Popover>
      )
    };

    return (
      <Panel className="sidebar-playlist-item card"
        eventKey={this.props.eventKey}
        {...this.props}>
        {Object.keys(this.props.playlistSongs).map((songKey, index) => {
          let tempSongName = this.props.playlistSongs[songKey];
          
          return (
            <div className="sidebar-song-item card" key={index} onClick={() => this.props.setPlayingMusicId(songKey)}>
              <img alt="Song icon" src={songKey === this.props.user.currentlyPlayingMusicId ? playingBars : singleNodeIcon} />
              {tempSongName.length > 29 ? tempSongName.substring(0, 26) + '...' : tempSongName}
              <div className="song-item-options">
                <OverlayTrigger trigger="click" rootClose placement="top" overlay={playlistsPopover(songKey)}>
                  <img onClick={e => this.handleOptionAddClick(e, songKey)} alt="Add icon" src={add} />
                </OverlayTrigger>
                <img onClick={e => this.handleOptionDelete(e, songKey)} alt="Song icon" src={remove} />
              </div>
            </div>
          )
        })}
      </Panel>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlayingMusicId: musicId => {
      dispatch(setPlayingMusicId(musicId));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistItem));
