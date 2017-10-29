import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setGAPI } from './redux/actions';

import folderIcon from '../img/folder.svg';
import backIcon from '../img/go_back.svg';
import singleNodeIcon from '../img/music_node.svg';

class ImportPage extends Component {

  state = {
    folderIds: ['root'],
    folderFiles: [],
    selectedFiles: [],
    currentFolderName: 'root'
  }

  componentWillMount() {
    this.getDriveFiles();
  }

  getGapi() {
    return this.props.packages.gapi ? new Promise((resolve, failure) => resolve(this.props.packages.gapi)) : require('google-client-api')();
  }

  getDriveFiles() {
    this.getGapi().then(gapi => {
      gapi.load('client', () => {
        gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest')
        .then(success => {
          gapi.client.drive.files.list({
            pageSize: 1000,
            fields: 'nextPageToken, files(id, name, mimeType)',
            q: `'${this.state.folderIds[this.state.folderIds.length - 1]}' in parents and (name contains '.mp3' or mimeType = 'application/vnd.google-apps.folder')`
          }).then(res => {
            this.setState({folderFiles: res.result.files})
          });
        })
      })
    });
  }

  backButtonOnClick() {
    let temp = this.state.folderIds;
    temp.pop();
    this.setState({folderIds: temp});
    this.getDriveFiles();
  }

  folderFileOnClick(file) {
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      this.setState({
        folderIds: this.state.folderIds.concat([file.id]),
        currentFolderName: file.name
      });
      this.getDriveFiles();
    } else {

    }
  }

  selectedFileOnClick() {

  }

  render() {
    return (
      <div className="import-page container">
        <Row>
          <Col xs={12} sm={9} md={7} mdOffset={1}>
            <div className="card import-page-card">
              <div className="import-page-card-title">
                <Button className="import-page-back-button" onClick={this.backButtonOnClick.bind(this)}>
                  <img alt="Folder icon" src={backIcon} />
                </Button>
                <h4 className="import-page-folder-title"><img alt="Folder icon" src={folderIcon} />{this.state.currentFolderName}</h4>
              </div>

              <div>
                {this.state.folderFiles.sort((a, b) => {
                  if (a.mimeType === 'application/vnd.google-apps.folder' && b.mimeType === 'application/vnd.google-apps.folder') {
                    return 0;
                  } else if (a.mimeType === 'application/vnd.google-apps.folder') {
                    return -1;
                  } else {
                    return 1;
                  }
                }).map((item, index) => {
                  return(
                    <Button className="import-page-folder-file card"
                      onClick={() => this.folderFileOnClick(item)}
                      style={{backgroundColor: this.state.selectedFiles.includes(item) ? '#e6e6e6' : '#ffffff'}}
                      key={index}>
                      <img alt="Music node icon" src={item.mimeType === 'application/vnd.google-apps.folder' ? folderIcon : singleNodeIcon} />
                      {item.name.length > 20 ? item.name.substring(0 ,20)+'...' : item.name}
                    </Button>
                  )
                })}
              </div>
            </div>
          </Col>

          <Col xs={12} sm={3}>
            <div className="card import-page-card">
              {this.state.selectedFiles.map((item, index) => {
                return(
                  <Button className="import-page-folder-file card"
                    onClick={this.selectedFileOnClick.bind(this)}
                    key={index}>
                  </Button>
                )
              })}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
	return {
    packages: state.packages
	}
}

const mapDispatchToProps = dispatch => {
  return {
    setGAPI: gapi => {
      dispatch(setGAPI(gapi))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImportPage));
