import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../css/MusicPlayerPage.css';

class MusicPlayerPage extends Component {

  render() {
    return (
      <div className="music-player-page">
        <h1>Music Player Page</h1>
        <div className ="musicc-playlist">
            <Row>
                <Col md={6}>
                    <h1>Music List</h1>
                </Col>

                <Col md={6}>
                    <div className = "music-info">
                      <h1>Muisc Information</h1>
                      <Row>
                        <h1>Play Bar</h1>
                      </Row>
                    </div>
                </Col>
            </Row>
          </div>
      </div>




    );
  }
}

export default MusicPlayerPage;
