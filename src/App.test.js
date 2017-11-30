import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router';
import { mount, shallow } from 'enzyme';

import App from './App';
import Main from './js/Main';
import { Sidebar } from './js/components/SidebarContent';
import PlaylistItem from './js/components/PlaylistItem';

import rootReducer from './js/redux/reducers/index';

// Test Data
const typicalUser = {
  name: 'Anoop Santhosh',
  playlists: {
    "Favorites" : {
      "0B3-82hcS8hjnREw3VEhXSXpGcGs" : "回忆的沙漏",
      "0B3-82hcS8hjnSWd6M2RXT2xRUnM" : "如果来生还能遇见你",
      "0B3-82hcS8hjnWFpGcUVWMzRpS00" : "So Much Better (Avicii Remix)",
      "0B3-82hcS8hjnZTRYUFNqanluOFU" : "I Loved You",
      "0B3-82hcS8hjnbFFLMUxhZE11ZFk" : "What Would I Change It To",
      "1pLnbjXsBwyTAU7JxIjeqHHCd-AmBoWlc" : "Despacito (Remix)"
    },
    "Favorites from share" : {
      "0B3-82hcS8hjnREw3VEhXSXpGcGs" : "回忆的沙漏",
      "0B3-82hcS8hjnWFpGcUVWMzRpS00" : "So Much Better (Avicii Remix)",
      "0B3-82hcS8hjnZTRYUFNqanluOFU" : "I Loved You",
      "0B3-82hcS8hjnbFFLMUxhZE11ZFk" : "What Would I Change It To",
      "1pLnbjXsBwyTAU7JxIjeqHHCd-AmBoWlc" : "Despacito (Remix)"
    },
    "Google Drive Imports" : {
      "0B3-82hcS8hjnLUxiMUxQTnJwM2s" : "Turn Down for What (Official Remix)",
      "0B3-82hcS8hjnREw3VEhXSXpGcGs" : "回忆的沙漏",
      "0B3-82hcS8hjnSDIzRGF4TDdHUEE" : "What Makes You Beautiful",
      "0B3-82hcS8hjnSWd6M2RXT2xRUnM" : "如果来生还能遇见你",
      "0B3-82hcS8hjnWFpGcUVWMzRpS00" : "So Much Better (Avicii Remix)",
      "0B3-82hcS8hjnbFFLMUxhZE11ZFk" : "What Would I Change It To",
      "0B3-82hcS8hjnc09hVkFENEYtTTQ" : "Uptown Funk(feat.Bruno Mars)",
      "0B3-82hcS8hjncmR2ZXVjaFAzM1k" : "We Are Young",
      "1pLnbjXsBwyTAU7JxIjeqHHCd-AmBoWlc" : "Despacito (Remix)"
    },
    "LOL" : {
      "0B3-82hcS8hjnREw3VEhXSXpGcGs" : "回忆的沙漏",
      "0B3-82hcS8hjnSWd6M2RXT2xRUnM" : "如果来生还能遇见你",
      "0B3-82hcS8hjnZTRYUFNqanluOFU" : "I Loved You"
    }
  }
}
const typicalSettings = {
  isSidebarOpen: true
}
const typicalHistory = {
  location: {
    search: ''
  }
}
const shareHistory = {
  location: {
    search: 'sharePlaylist=LOL&data={"123456":"","0B3-82hcS8hjnREw3VEhXSXpGcGs":"回忆的沙漏","0B3-82hcS8hjnSWd6M2RXT2xRUnM":"如果来生还能遇见你","0B3-82hcS8hjnZTRYUFNqanluOFU":"I Loved You"}'
  }
}
const mockPackages = {
  gapi: {
    client: {
      request: () => {
        return new Promise((resolve, failure) => resolve({}));
      }
    }
  },
  firebase: {}
}

// Test Cases

/*
  Initial app crash testing
 */
it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

/*
  User Story #20
  As a user, I would like to be able to see the song
  image in the player interface.
 */
describe('User Story #20', () => {

  it('changes song image src', () => {

  })
})

/*
  User Story #21
  As a user, I would like to share my music and playlist
  to social media like facebook, twitter, etc.
 */
describe('User Story #21', () => {
  it('generates sharing string when click', () => {
    let wrapper = mount(
      <Provider store={createStore(rootReducer)}>
        <MemoryRouter initialEntries={[ '/player' ]}>
          <Sidebar user={typicalUser} settings={typicalSettings} packages={mockPackages} history={typicalHistory} />
        </MemoryRouter>
      </Provider>
    );
    let shareButton = wrapper.find('#PlaylistItem-LOL[playlistName="LOL"][eventKey=1]').get(3).props.header.props.children[2];
    expect(shallow(shareButton).simulate('click'));
  })
  it('adds playlist through url', () => {
    let wrapper = mount(
      <Provider store={createStore(rootReducer)}>
        <MemoryRouter initialEntries={[ '/player' ]}>
          <Sidebar user={typicalUser} settings={typicalSettings} packages={mockPackages} history={shareHistory} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(Sidebar).instance().receivedSharingPlaylistName).toEqual('LOL');
    expect(wrapper.find(Sidebar).instance().receivedSharingPlaylist).toEqual(typicalUser.playlists.LOL);
  })
})

/*
  User Story #24
  As a user, I would like to be able to click a button on
  the top of the screen to expand and show the playlists
  from the left.
 */
describe('User Story #24', () => {

  it('shows playlists on the left when clicking toggle', () => {

  })
})

/*
  User Story #25
  As a user, I would like to be able to be prompted about
  file not existing if the song I play from playlist no
  longer exists
 */
describe('User Story #25', () => {

  it('shows toast', () => {

  })
})

/*
  User Story #26
  As a user, I would like to be able to have a button in
  the music panel to add the currently playing song to
  a different playlist
 */
describe('User Story #26', () => {

  it('adds song to playlist', () => {

  })
})

/*
  User Story #27
  As a user, I would like to be able to show options for each song
 */
describe('User Story #27', () => {

  it('shows options on hover', () => {

  })
})
