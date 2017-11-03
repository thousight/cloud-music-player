import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ReactHowler from 'react-howler';

import repeat from '../../img/repeat.svg';
import shuffle from '../../img/shuffle.svg';
import next from '../../img/skip_next.svg';
import play from '../../img/play_arrow.svg';
import volume from '../../img/volume.svg';
import cover from '../../img/music_node.svg';
import CircularButton from './CircularButton';

class MusicPlayer extends Component {
  playMusic() {
    console.log('yay');
  }

  render() {
    return (
      <div className="music-player">
        {/* Music Player */}
        {this.props.user.currentlyPlayingMusicId ?
          <ReactHowler
            src={'https://drive.google.com/uc?export=download&id=' + this.props.user.currentlyPlayingMusicId}
            playing={true}
            loop={true}
            html5={true} />
            :
            ''
          }

          <div className="music-player-progress-bar">

          </div>

          <div className="music-player-buttons-wrapper card">
            <CircularButton
              lg
              onClick={this.playMusic}
              icon={play}
            />
            <CircularButton
              onClick={this.playMusic}
              icon={play}
            />
          </div>
        </div>
      )
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.user,
      packages: state.packages,
    }
  }

  // const mapDispatchToProps = dispatch => {
  //   return {
  //     setSidebarOpenState: bool => dispatch(setSidebarOpenState(bool))
  //
  //   }
  // }

  export default withRouter(connect(mapStateToProps, null)(MusicPlayer));
