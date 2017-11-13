import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ReactHowler from 'react-howler';
import { toast } from 'react-toastify';
import ReactDOM from 'react-dom';
import CircularButton from './CircularButton';
import { setPlayingMusicId, startPlaying, stopPlaying } from '../redux/actions';

import repeat from '../../img/repeat.svg';
import repeatOne from '../../img/repeat_one.svg';
import shuffle from '../../img/shuffle.svg';
import next from '../../img/skip_next.svg';
import play from '../../img/play_arrow.svg';
import pause from '../../img/pause.svg';
import volume from '../../img/volume.svg';
import mute from '../../img/mute.svg';

class MusicPlayer extends Component {

  playModes = ['singleRepeat', 'playlistRepeat', 'shuffle'];

  errorTimeout;

  state = {
    playlist: [],
    playingOrder: [],
    currentPlayMode: 'normal',
    volume: 0.3,
    mute: false,

  }

  componentDidMount() {
    console.log(this.player);

  }

  playMusic() {
    console.log(this.player);
    // Control music play pause

    if (this.props.user.isPlaying) {
      this.player.pause();
      this.props.stopPlaying();
    } else {
      this.player.play();
      this.props.startPlaying();
    }

  }

  getPlayIcon() {
    return this.props.user.isPlaying ? pause : play
  }

  playNext() {
    // Play the next music in playlist based on playing order
    // If this is the last item in playing order
    // play the first one

  }

  playPrevious() {
    // Play the next music in playlist based on playing order
    // If this is the first item in playing order
    // play the last one

  }

  setPlayMode() {
    // Set play mode

  }

  getPlayModeIcon() {
    switch (this.state.currentPlayMode) {
      case 'singleRepeat':
      return repeatOne;
      case 'shuffle':
      return shuffle;
      default:
      return repeat;
    }
  }

  setVolumeClick(e) {
    var specs = ReactDOM.findDOMNode(this.slidebar).getBoundingClientRect();
    this.setState({ volume: (e.screenX - specs.left) / 100});
    console.log(this.state.volume);
  }

  setMute() {
    // Set mute or not
    this.setState({mute: !this.state.mute})
  }

  getVolumeIcon() {
    return this.state.mute ? mute : volume
  }

  setProgress(percent) {
    // Set progress of music

  }

  onLoadError() {
    if (this.props.user.currentlyPlayingMusicId) {
      clearTimeout(this.errorTimeout);

      this.errorTimeout = setTimeout(() => {
        let filename = this.props.user.playlists[this.props.user.currentlyPlayingPlaylistName][this.props.user.currentlyPlayingMusicId];
        toast.error(`Unable to fetch ${filename}`, {closeButton: false});
        this.playNext();
      }, 1000)
    }
  }

  render() {

    return (
      <div className="music-player">
        {/* Music Player     */}
        <ReactHowler
          src={'https://drive.google.com/uc?export=download&id=' + this.props.user.currentlyPlayingMusicId}
          playing={this.props.user.isPlaying}
          html5={true}
          onLoadError={this.onLoadError.bind(this)}
          volume={this.state.volume}
          mute={this.state.mute}
          ref={(ref) => (this.player = ref)} />

          <div className="music-player-progress-bar">

          </div>

          <div className="music-player-buttons-wrapper card">
            <img className="music-player-modes"
              alt="Play modes"
              src={this.getPlayModeIcon()}
              onClick={this.setPlayMode.bind(this)}/>

              <CircularButton
                flipIcon
                onClick={this.playPrevious.bind(this)}
                icon={next}
              />

              <CircularButton
                lg
                onClick={this.playMusic.bind(this)}
                icon={this.getPlayIcon()}
              />

              <CircularButton
                onClick={this.playNext.bind(this)}
                icon={next}
              />

              <div className="music-player-volume-wrapper">
                <img className="music-player-volume"
                  alt="Volume button"
                  src={this.getVolumeIcon()}
                  onClick={this.setMute.bind(this)}/>
                  <ProgressBar className="music-player-volume-progress"
                    now={this.state.volume * 100}
                    ref={(input) => { this.slidebar = input }}
                    onClick={this.setVolumeClick.bind(this)}
                    />



                  </div>
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

        const mapDispatchToProps = dispatch => {
          return {
            setPlayingMusicId: id => dispatch(setPlayingMusicId(id)),
            startPlaying: () => dispatch(startPlaying()),
            stopPlaying: () => dispatch(stopPlaying()),
          }
        }

        export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicPlayer));
