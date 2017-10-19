import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';

import SidebarContent from './components/SidebarContent.js'
import repeat from '../img/repeat.svg';
import shuffle from '../img/shuffle.svg';
import next from '../img/skip_next.svg';
import play from '../img/play_arrow.svg';
import volume from '../img/volume.svg';
import cover from '../img/kris.jpg';


class MusicPlayerPage extends Component {

  state = {
    sidebarDocked: true
  }

  render() {
    return (
      <Sidebar
        sidebar={<div>{SidebarContent}</div>}
        open={this.props.settings.isSidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen} >
        <div className="player-page">

        </div>
      </Sidebar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    packages: state.packages,
    settings: state.settings
  }
}

export default withRouter(connect(mapStateToProps)(MusicPlayerPage));
