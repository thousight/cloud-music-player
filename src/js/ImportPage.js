import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
class ImportPage extends Component {

  state = {
    files: [],
    filesSelected: [],
    numFilesSelected: 0,
    filesId: []
  }


  selectAllButtonOnClick() {
    


  }
  clearButtonOnClick() {
    this.setState({
      filesSelected: [],
      numFilesSelected: 0,
      filesId: []
    })

  }
  submitButtonOnClick() {
    alert("Need to be specified by MusicPlayerPage data structure");
  }

  renderFiles() {
    window.gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest')
    .then(success => {
      window.gapi.client.drive.files.list(
      ).then(res => {
        this.setState({files: res.result.files})
      });
    });
  }
  componentWillMount() {
    this.renderFiles();
  }
  render() {
    return (
      <div className="import-page">
        <Col className="navigating" md={5} mdOffset={2}>
          <Row className="navigating-header">
            <h1 className="header">
              User's Music Folder
            </h1>
          </Row>
          <Row className="navigating-content">

            {this.state.files.map(item => {
              if (item.mimeType === 'audio/mp3') {
                return (
                  <FileButton key={item.id} name={item.name} instance={this} active={true} file_id={item.id} />

                );
              }
            })}
          </Row>
          <Button className="select-all-button" onClick={this.selectAllButtonOnClick.bind(this)}>Select All</Button>

        </Col>
        <Col className="selecting" md={2} mdOffset={1}>
          <Row className="selecting-header">
            <h1 className="header">
              Selected Music File
            </h1>
          </Row>
          {this.state.filesSelected.map(item => {
            return (
              <Row key={item}>
                {item}
              </Row>
            );
          })}
          <Row>
            <Col md={6}>
              <Button className="clear-button" onClick={this.clearButtonOnClick.bind(this)}>X    Clear</Button>
            </Col>
            <Col md={6}>
              <Button className="submit-button" onClick={this.submitButtonOnClick.bind(this)}>√   Submit</Button>
            </Col>
          </Row>


        </Col>

      </div>

    );
  }
}
class FileButton extends Component {
  state = {
    active: true
  }
  fileButtonOnClick = () => {
    if (this.props.instance.state.filesId.indexOf(this.props.file_id) === -1) {
      this.state.active = true;

    }
    else {
      this.state.active = false;
    }
    if (this.state.active === true) {
      this.props.instance.setState(previousState => {
        previousState.filesSelected.push(this.props.name);
        previousState.filesId.push(this.props.file_id);
        return {
          filesSelected: previousState.filesSelected,
          numFilesSelected: ++previousState.numFilesSelected,
          filesId: previousState.filesId
        }
      });
      this.state.active = false;

    }

  }
  render() {
    return (
      <Col md={3}>
        <Button onClick={this.fileButtonOnClick}>
          {this.props.name}
        </Button>
      </Col>
    );
  }
}
export default ImportPage;
