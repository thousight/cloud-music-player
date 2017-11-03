import React, { Component } from 'react';
import { Panel, Button, ButtonToolbar,ButtonGroup, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import { setPlayingMusicId } from '../redux/actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';


var buttonStyle = {
  backgroundColor: '#229ac8',
  backgroundImage: 'linear-gradient(to bottom, #23a1d1, #1f90bb)',
  backgroundRepeat: 'repeat-x',
  borderColor: '#1f90bb #1f90bb #145e7a',
  color: '#ffffff',
  textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)'
}

class PlaylistItem extends Component {
  constructor(props) {
      super(props);

      this.state = {
        value: 0,
        currentExpand: -1
      };
    }

    onChange = (value) => {
      this.setState({ value });
    };

  expandPlaylist(index){
    console.log(index)
  }

  songOnClick(key) {
    this.props.setPlayingMusicId(key);
  }


 componentDidMount () {
  let elements = document.getElementsByClassName("panel-heading")
  const elem = document.createElement("img");
  elem.src = require('../../img/music_node.svg');
  console.log(elements);
  let length = elements.length;
  console.log(length);
  let i = 0;
  elements[0].appendChild(elem)
  elements[1].appendChild(elem)
  // for(i = 0; i< length -1; i++){
  //   let temp = elements[i + 1]
  //   // document.getElementById({temp}).appendChild(elem);
  //   // temp.appendChild(elem);
  //   elements.insertBefore(elem, temp)
  //   console.log(elements[i])
  // }
}



  render() {
    return (
      <Panel id="asd" ref="asd" className="sidebar-playlist-item"
        eventKey={this.props.eventKey}
        onClick = {() => this.expandPlaylist(this.props.eventKey)}
        {...this.props}>
          <ToggleButtonGroup vertical  type="radio" name="options" value={this.state.value}
        onChange={this.onChange}>
        {Object.keys(this.props.playlistSongs).map((songKey, index) => {
          return (
            <ToggleButton value={index + 1} className="song-item"  onClick={() => this.songOnClick(songKey)} key={index}>
              {this.props.playlistSongs[songKey]}
            </ToggleButton>
          )
        })}
        </ToggleButtonGroup>

      </Panel>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlayingMusicId: musicId => {
      dispatch(setPlayingMusicId(musicId));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistItem));
