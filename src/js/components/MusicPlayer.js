import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ReactHowler from 'react-howler';
import { ProgressBar } from 'react-bootstrap';

import CircularButton from './CircularButton';
import { setPlayingMusicId } from '../redux/actions';

import repeat from '../../img/repeat.svg';
import repeatOne from '../../img/repeat_one.svg';
import shuffle from '../../img/shuffle.svg';
import next from '../../img/skip_next.svg';
import play from '../../img/play_arrow.svg';
import pause from '../../img/pause.svg';
import volume from '../../img/volume.svg';
import mute from '../../img/mute.svg';

class MusicPlayer extends Component {

  playModes = ['singleRepeat', 'playlistRepeat', 'shuffle']

  state = {
    playlist: [],
    playingOrder: [],
    currentPlayMode: 'normal',
    volume: 0.3,
    isPlaying: false
  }

  componentDidMount() {
    console.log(this.player);
  }

  playMusic() {
    console.log(this.player);
    // Control music play pause
    if (this.state.isPlaying) {
      this.player.pause();
    } else {
      this.player.play();
    }
    this.setState({isPlaying: !this.state.isPlaying});
  }

  getPlayIcon() {
    return this.state.isPlaying ? pause : play
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

  setVolume(volume) {
    // Set volume of music player
    this.setState({volume});
    this.player.volume(volume);
  }

  setMute() {
    // Set mute or not
    this.state.volume === 0 ? this.player.volume() : this.player.mute();
  }

  getVolumeIcon() {
    return this.state.volume === 0 ? mute : volume
  }

  setProgress(percent) {
    // Set progress of music

  }

  render() {

    return (
      <div className="music-player">
        {/* Music Player */}
        <ReactHowler
          src={'https://drive.google.com/uc?export=download&id=' + this.props.user.currentlyPlayingMusicId}
          playing={true}
          html5={true}
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
              now={this.state.volume * 100}/>
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
    setPlayingMusicId: id => dispatch(setPlayingMusicId(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicPlayer));
