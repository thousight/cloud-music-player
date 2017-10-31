import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { setPlayingMusicId } from '../redux/actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class PlaylistItem extends Component {
  songOnClick(key) {
    this.props.setPlayingMusicId(key);
  }

  render() {
    return (
      <Panel className="sidebar-playlist-item"
        eventKey={this.props.eventKey}
        {...this.props}>
        {Object.keys(this.props.playlistSongs).map((songKey, index) => {
          return (
            <Button className="song-item" onClick={() => this.songOnClick(songKey)} key={index}>
              {this.props.playlistSongs[songKey]}
            </Button>
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
