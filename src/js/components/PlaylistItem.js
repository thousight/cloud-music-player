import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { setPlayingMusicId } from '../redux/actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class PlaylistItem extends Component {
  songOnClick(key) {
    this.props.setPlayingMusicId(key);
  }


//  componentDidMount () {
//   let elements = document.getElementsByClassName('id')
//   const elem = document.createElement("img");
//   elem.src = require('../../img/playlist_play.svg');
//   console.log(elements);
//   // Object.keys(elements).map((key, index) =>  {
//   //   console.log(key);
//   //   console.log(elements);
//   //   document.getElementById(key).appendChild(elem);
//   // })
// }
  render() {
    return (
      <Panel className="sidebar-playlist-item" id="progress" ref="progress"
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
