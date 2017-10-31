import React, { Component } from 'react';
import { Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';

import PlaylistItem from './PlaylistItem'

class SidebarContent extends Component {

  render() {
    return (
      <Accordion className="sidebar-content">
        {this.props.user.playlists ? Object.keys(this.props.user.playlists).map((key, index) => {
          return (
            <PlaylistItem key={index}
              header={key}
              playlistSongs={this.props.user.playlists[key]}

              eventKey={index}/>
          )
        }) : <div />}
      </Accordion>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    packages: state.packages
  }
}

export default connect(mapStateToProps)(SidebarContent);
