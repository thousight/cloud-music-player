import React, { Component } from 'react';

import Navbar from './components/Navbar';
import { Row, Col } from 'react-bootstrap';
import '../css/MusicPlayerPage.css';
import Side from './components/Side';
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
        <Side />

      <Col  xs={0} sm ={2} md ={3}>


        {/* <Navbar /> */}
      </Col>

      <Col xs ={12} sm={10} md={9}>
        <Row className = "cover-page">
          <div >
            <Col xs = {0} sm={1} md={3}>
            </Col>
            <Col xs ={12} ms={10} md={6}>
              <img className="cover-pic" alt="cover" src={cover} />
            </Col>
            <Col xs = {0} sm={1} md= {3}>
            </Col>
          </div>
        </Row>
        <Row >
          <Col xs={1} md={1} >
            <img className="repeat-play" alt="repeat" src={repeat} />
          </Col>
          <Col xs={1} md={1}>
            <img className="shuffle-play" alt="shuffle" src={shuffle} />
          </Col>
          <Col xs={2} md={2}>
            <img className="previous-song"  alt="next" src={next} />
          </Col>
          <Col xs={2} md={2}>
            <img className="play-arrow" alt="play" src={play} />
          </Col>
          <Col xs={2} md={2}>
            <img className="next-song" alt="next" src={next} />
          </Col>
          <Col xs={4} md={4}>
            <img className="volume-sign" alt="volume" src={volume} />
          </Col>
        </Row>

       </Col>

       </div>




    );
  }
}

export default MusicPlayerPage;
