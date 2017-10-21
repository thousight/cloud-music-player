import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

export default class PlaylistItem extends Component {

  render() {
    return (
      <Panel className="sidebar-playlist-item"
        eventKey={this.props.eventKey}
        {...this.props}>
        {Object.values(this.props.playlistSongs).map((songItem, index) => {
          return (
            <h6 key={index}>{songItem}</h6>
          )
        })}
      </Panel>
    );
  }
}
