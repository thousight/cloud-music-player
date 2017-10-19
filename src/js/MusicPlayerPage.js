import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import repeat from '../img/repeat.svg';
import shuffle from '../img/shuffle.svg';
import next from '../img/skip_next.svg';
import play from '../img/play_arrow.svg';
import volume from '../img/volume.svg';
import cover from '../img/kris.jpg';


class MusicPlayerPage extends Component {

  render() {
    return (
      <div className="music-player-page">

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    packages: state.packages
  }
}

export default withRouter(connect(mapStateToProps)(MusicPlayerPage));
