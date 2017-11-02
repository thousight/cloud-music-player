import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { setPlayingMusicId } from '../redux/actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import singleNodeIcon from '../../img/music_node.svg';
import playingBars from '../../img/bars.svg';

class PlaylistItem extends Component {

  render() {
    let tempSongName = ''
    return (
      <Panel className="sidebar-playlist-item"
        eventKey={this.props.eventKey}
        {...this.props}>
        {Object.keys(this.props.playlistSongs).map((songKey, index) => {
          tempSongName = this.props.playlistSongs[songKey];
          return (
            <div className="sidebar-song-item card" onClick={() => this.props.setPlayingMusicId(songKey)} key={index}>
              <img alt="Song icon" src={singleNodeIcon} />
              {tempSongName.length > 20 ? tempSongName.substring(0 ,20)+'...' : tempSongName}
              {songKey === this.props.user.currentlyPlayingMusicId ? <img style={{float: 'right'}} alt="Song icon" src={playingBars} /> : ''}
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
