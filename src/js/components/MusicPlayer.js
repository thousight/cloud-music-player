import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ReactHowler from 'react-howler';

import repeat from '../../img/repeat.svg';
import shuffle from '../../img/shuffle.svg';
import next from '../../img/skip_next.svg';
import play from '../../img/play_arrow.svg';
import volume from '../../img/volume.svg';
import cover from '../../img/music_node.svg';

class MusicPlayer extends Component {
  render() {
    return (
      <div className="music-player">
        {/* Music Player */}
          <ReactHowler
            src={'https://drive.google.com/uc?export=download&id=' + this.props.user.currentlyPlayingMusicId}
            playing={true}
            loop={true}
            html5={true} />
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
