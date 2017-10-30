import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import listoption from '../../img/playlist_play.svg';
import note from '../../img/music_note.svg';
import ReactDOM from 'react-dom';

function handleClick() {
alert('You have clicked on me');
}
export default class PlaylistItem extends Component {


//  componentDidMount () {
//   let elements = document.getElementsByClassName('id')
//   const elem = document.createElement("img");
//   elem.src = require('../../img/playlist_play.svg');
//   console.log(elements);
//   // Object.keys(elements).map((key, index) =>  {
//   //   console.log(key);
//   //   console.log(elements);
//   //   document.getElementById(key).appendChild(elem);
//   // })
// }
  render() {
    return (
      <Panel className="sidebar-playlist-item" id="progress" ref="progress"
        eventKey={this.props.eventKey}
        {...this.props}>


        {Object.values(this.props.playlistSongs).map((songItem, index) => {

          return (

            <Panel onClick={handleClick}>
            <img className = "musicNote" src = {note}/>
            <h6  className = "singleSong" key={index}>{songItem}</h6>
          </Panel>
          )
        })}
      </Panel>
    );
  }
}
