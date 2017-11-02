import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setGAPI, setPlaylists } from './redux/actions';
import folderIcon from '../img/folder.svg';
import backIcon from '../img/go_back.svg';
import singleNodeIcon from '../img/music_node.svg';

class ImportPage extends Component {

  state = {
    folderIds: ['root'],
    folderFiles: [],
    selectedFiles: [],
    selectedFilesIds: [],
    currentFolderName: ['root']
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
            q: `'${this.state.folderIds[this.state.folderIds.length - 1]}' in parents and trashed = false and (name contains '.mp3' or mimeType = 'application/vnd.google-apps.folder')`
          }).then(res => {
            this.setState({folderFiles: res.result.files})
          });
        })
      })
    });
  }

  backButtonOnClick() {
    let tempFolderIds = this.state.folderIds, tempCurrentFolderName = this.state.currentFolderName;
    if (tempFolderIds[tempFolderIds.length - 1] != 'root') {
      tempFolderIds.pop();
      tempCurrentFolderName.pop();
    }

    this.setState({folderIds: tempFolderIds, currentFolderName: tempCurrentFolderName});
    this.getDriveFiles();
  }
  selectAllButtonOnClick() {
    this.getGapi().then(gapi => {
      gapi.load('client', () => {
        gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest')
        .then(success => {
          gapi.client.drive.files.list({
            pageSize: 1000,
            fields: 'nextPageToken, files(id, name, mimeType)',
            q: `trashed = false and (name contains '.mp3')`
          }).then(res => {
            this.setState(previousState => {
              previousState.selectedFiles = [];
              previousState.selectedFilesIds = [];
              res.result.files.map(item => {
                previousState.selectedFilesIds.push(item.id);
              })
              return ({
                selectedFiles: res.result.files,
                selectedFilesIds: previousState.selectedFilesIds
              })
            });

          });
        })
      })
    });
  }
  submitButtonOnClick() {
    if (this.state.selectedFilesIds.length != 0) {

      let newLocation = this.props.packages.firebase.database().ref('/users/' +
      this.props.packages.firebase.auth().currentUser.uid + '/playlists' + '/Google\ Drive\ Imports');
      let temp = this.state.selectedFiles;
      var obj = new Object();
      temp.map(item => {
        let id = item.id;
        let name = item.name.replace(".mp3", "");
        obj[id] = name;
        newLocation.set(obj);
      })
      this.props.packages.firebase.database().ref('/users/' +
      this.props.packages.firebase.auth().currentUser.uid + '/playlists' ).once('value').then(snapshot => {
        this.props.setPlaylists(snapshot.val());
        this.props.history.push('/player');
      })
      console.log(this.props.user.playlists);




    }

  }
  clearButtonOnClick() {
    this.setState({
      selectedFiles: [],
      selectedFilesIds: []
    })
  }
  folderFileOnClick(file) {
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      this.setState({
        folderIds: this.state.folderIds.concat([file.id]),
        currentFolderName: this.state.currentFolderName.concat([file.name])
      });
      this.getDriveFiles();
    } else {
      let temp = this.state.selectedFiles;
      let tempIds = this.state.selectedFilesIds;
      if (this.state.selectedFilesIds.indexOf(file.id) == -1) {
        temp.push(file);
        tempIds.push(file.id);
        this.setState({selectedFiles: temp,
          selectedFilesIds: tempIds});

        }
      }
    }


    selectedFileOnClick(file) {
      let temp = this.state.selectedFiles;
      let tempIds = this.state.selectedFilesIds;
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].id === file.id) {
          temp.splice(i, 1);
          break;
        }
      }
      for (var i = 0; i < tempIds.length; i++) {
        if (tempIds[i] === file.id) {
          tempIds.splice(i, 1);
          break;
        }
      }

      this.setState({selectedFiles: temp,
        selectedFilesIds: tempIds});
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
                    <h4 className="import-page-folder-title">
                      <img alt="Folder icon" src={folderIcon} />
                      {this.state.currentFolderName[this.state.currentFolderName.length - 1]}
                    </h4>
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
                          style={{backgroundColor: this.state.selectedFilesIds.includes(item.id) ? '#e6e6e6' : '#ffffff'}}
                          key={index}>
                          <img alt="Music node icon" src={item.mimeType === 'application/vnd.google-apps.folder' ? folderIcon : singleNodeIcon} />
                          {item.name.length > 20 ? item.name.substring(0 ,20)+'...' : item.name}
                        </Button>
                      )
                    })}
                  </div>

                </div>
                <Button className="import-page-folder-file card"
                  onClick={this.selectAllButtonOnClick.bind(this)}
                  >Select All
                </Button>
              </Col>

              <Col xs={12} sm={3}>
                <Row>
                  <div className="card import-page-card">
                    {this.state.selectedFiles.map((item, index) => {
                      return(
                        <Button className="import-page-folder-file card"
                          onClick={() => this.selectedFileOnClick(item)}
                          key={index}>{item.name}
                        </Button>
                      )
                    })}
                  </div>
                </Row>
                <Row>
                  <Col md={6}>
                    <Button className="clear-button"
                      onClick={this.clearButtonOnClick.bind(this)}
                      >X Clear
                    </Button>
                  </Col>

                  <Col md={6}>
                    <Button className="submit-button"
                      onClick={this.submitButtonOnClick.bind(this)}
                      >√ Submit
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )
      }
    }

    const mapStateToProps = state => {
      return {
        packages: state.packages,
        user: state.user
      }
    }

    const mapDispatchToProps = dispatch => {
      return {
        setGAPI: gapi => {
          dispatch(setGAPI(gapi))
        },
        setPlaylists: playlists => {
          dispatch(setPlaylists(playlists))
        }
      }
    }

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImportPage));
