import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ProgressBar } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ReactHowler from 'react-howler';
import { toast } from 'react-toastify';
import Slider from 'react-rangeslider';

import CircularButton from './CircularButton';
import { setPlayingMusicId, startPlaying, stopPlaying, setMute, setUnmute } from '../redux/actions';

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
    progress: 0,
    currentTime: 0,
    durationTime: 0
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

  handleVolumeSliderChange(volume) {
    this.setState({volume: volume.toFixed(2)});
  }

  settingMute() {
    // Set mute or not
    if(this.props.user.isMute) {
      this.props.setUnmute();
    }
    else {
      this.props.setMute();
    }
  }
  handleSeek() {
    if (this.player != null) {
      console.log(this.player.seek());
      this.setState({progress: this.player.seek()})
    }
  }
  getVolumeIcon() {
    return this.props.user.isMute ? mute : volume
  }
  updateProgress() {
    if (this.state.progress != 100) {
      this.setState({
        progress: (this.player.seek() * 100 / this.player.duration()).toFixed()
      });
      console.log(this.state.progress);
      requestAnimationFrame(this.updateProgress.bind(this));
    }
    else {
      this.props.stopPlaying();
      this.setState({
        progress: 0
      });
    }
  }



  setProgress(position) {
    // Set progress of music
    this.setState({progress: position});
    this.player.seek((this.player.duration() / 100 * position).toFixed());

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
  componentDidMount() {
    requestAnimationFrame(this.updateProgress.bind(this));
  }
  render() {

    return (
      <div className="music-player">
        {/* Music Player */}
        <ReactHowler
          src={'https://drive.google.com/uc?export=download&id=' + this.props.user.currentlyPlayingMusicId}
          playing={this.props.user.isPlaying}
          html5={true}
          onLoadError={this.onLoadError.bind(this)}
          mute={this.props.user.isMute}
          volume={this.state.volume}
          ref={(ref) => (this.player = ref)} />

          <Slider className="music-player-progress-bar"
            value={this.state.progress}
            orientation="horizontal"
            onChange={this.setProgress.bind(this)}
          />


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
                  onClick={this.settingMute.bind(this)}/>

                  <Slider className="music-player-volume-slider"
                    value={this.state.volume}
                    min={0}
                    max={1}
                    step={0.01}
                    orientation="horizontal"
                    onChange={this.handleVolumeSliderChange.bind(this)}/>

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
            setMute: () => dispatch(setMute()),
            setUnmute: () => dispatch(setUnmute()),
          }
        }

        export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicPlayer));
