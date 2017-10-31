import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import { Button } from 'react-bootstrap'
import SidebarContent from './components/SidebarContent.js'
import repeat from '../img/repeat.svg';
import shuffle from '../img/shuffle.svg';
import next from '../img/skip_next.svg';
import play from '../img/play_arrow.svg';
import volume from '../img/volume.svg';
import cover from '../img/music_node.svg';

import { setSidebarOpenState } from './redux/actions';

const mql = window.matchMedia(`(min-width: 768px)`);

class MusicPlayerPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sidebarDocked: true
    }

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql, sidebarDocked: mql.matches });
  }

  componentDidMount() {
    let sidebarOverlay = document.getElementsByClassName('playlists-sidebar-overlay').item(0);
    sidebarOverlay.onclick = () => {
      this.props.setSidebarOpenState(false);
    }
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  // When screen size changes from sm to md(mql.matches = true) and from md to sm(mql.matches = false)
  mediaQueryChanged() {
    this.setState({sidebarDocked: this.state.mql.matches});
    this.props.setSidebarOpenState(false);
  }
  renderMusicInfo() {
    //0B1_viDQ4tDgRb3E3WC1kTFI5RTg/view?usp=sharing
    /*
    var url = "https://drive.google.com/uc?export=download&id=" + this.props.user.currentlyPlayingMusicId;
    var jsmediatags = require("jsmediatags");

jsmediatags.read(url, {
  onSuccess: function(tag) {
    console.log(tag);
  },
  onError: function(error) {
    console.log(':(', error.type, error.info);
  }
});

    return this.props.user.currentlyPlayingMusicId
    */
  }
  render() {
    // Sidebar content stuff
    const sidebarContent = (<div style={{ width: '300px' }}>
      <SidebarContent />
    </div>);

    return (

      <Sidebar
        sidebar={sidebarContent}
        sidebarClassName="playlists-sidebar"
        overlayClassName="playlists-sidebar-overlay"
        open={this.props.settings.isSidebarOpen}
        docked={this.state.sidebarDocked} >
        <div className="player-page container">
          <Row>
            <Col md={6}>
              <Row md={5} mdOffset={12}>

              {this.renderMusicInfo()}
            </Row>
          </Col>
        </Row>
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

const mapDispatchToProps = dispatch => {
  return {
    setSidebarOpenState: bool => {
      dispatch(setSidebarOpenState(bool))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicPlayerPage));
