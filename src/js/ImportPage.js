import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
class ImportPage extends Component {

  selectAllButtonOnClick() {
    alert("did something");
  }

  render() {
    return (
      <div className="import-page">
            <Col className="navigating" md={5} mdOffset={2}>
              <Row className="navigating-header">
                <Col md={3}>
                  <Button className="back-to-parent-button" onClick={this.selectAllButtonOnClick.bind(this)}></Button>
                </Col>
                <Col md={5}>
                  <h1 className="header">
                    User's Music Folder
                  </h1>
                </Col>
              </Row>
              <Row className="navigating-content">
                <Col >
                  <Row>
                    <Button className="select-all-button" onClick={this.selectAllButtonOnClick.bind(this)}>Select All</Button>
                  </Row>
                </Col>

              </Row>
            </Col>
            <Col className="selecting" md={2} mdOffset={1}>
              <Row>
                <h1>
                  Selected Music File
                </h1>
              </Row>
              <Row>
                <Col md={6}>
                  <Button className="clear-button" onClick={this.selectAllButtonOnClick.bind(this)}>X    Clear</Button>
                </Col>
                <Col md={6}>
                  <Button className="submit-button" onClick={this.selectAllButtonOnClick.bind(this)}>√   Submit</Button>
                </Col>
              </Row>


            </Col>

      </div>

    );
  }
}

export default ImportPage;
