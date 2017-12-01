import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router';
import { mount, shallow } from 'enzyme';
import { Navbar } from 'react-bootstrap';


import App from './App';
import Main from './js/Main';
import { PlayerPage } from './js/MusicPlayerPage';
import { NavBar } from './js/components/NavigationBar';
import { Sidebar } from './js/components/SidebarContent';
import { MusicPlayer } from './js/components/MusicPlayer';
import PlaylistItem from './js/components/PlaylistItem';

import rootReducer from './js/redux/reducers/index';

// Test Data
const typicalUser = {
  name: 'Anoop Santhosh',
  currentlyPlayingMusicId: '0B3-82hcS8hjnSDIzRGF4TDdHUEE',
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
const newList = {
  location: {
    search: 'newList=Favorites&data={"123456":"","0B3-82hcS8hjnREw3VEhXSXpGcGs":"回忆的沙漏","0B3-82hcS8hjnSWd6M2RXT2xRUnM":"如果来生还能遇见你","0B3-82hcS8hjnWFpGcUVWMzRpS00":"So Much Better (Avicii Remix)","0B3-82hcS8hjnZTRYUFNqanluOFU":"I Loved You","0B3-82hcS8hjnbFFLMUxhZE11ZFk":"What Would I Change It To", "1pLnbjXsBwyTAU7JxIjeqHHCd-AmBoWlc":"Despacito (Remix)"}'
  }
}
const mockPackages = {
  gapi: {
    client: {
      request: () => {
        return new Promise((resolve, failure) => resolve({}));
      }
    },
    auth2: {
      getAuthInstance: () => {
        return {
          currentUser: {
            get: () => {
              return {
                getAuthResponse: () => {
                  return {
                    access_token: 'XXXXXX'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  firebase: {}
}
const mockImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAsICAoIBwsKCQoNDAsNERwSEQ8PESIZGhQcKSQrKigkJyctMkA3LTA9MCcnOEw5PUNFSElIKzZPVU5GVEBHSEX/2wBDAQwNDREPESESEiFFLicuRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUX/wAARCAV4BXgDAREAAhEBAxEB/8QAHAAAAwEBAQEBAQAAAAAAAAAAAAECAwQFBgcI/8QAVRAAAQMDAwIEBAMGAwQECA0FAQACEQMhMQQSQVFhBRMicQYygZFCobEHFCNSwdFi4fAVM3LxFiRDshc0NlN0gpLSJTVEVFVjZHODk6KjwsMmRYSU/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAKhEBAQACAgICAQQCAwADAAAAAAECEQMhEjEiQVEEEzJhF...';
const mockClosedSidebar = {
  isSidebarOpen: false
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
User Story #13
As a user, I would like to adjust the volume of the playing song.
*/
describe('User Story #13', () => {

  it('adjust the volume of the player', () => {
    let wrapper = mount(

      <MusicPlayer user={typicalUser} settings={typicalSettings} packages={mockPackages} history={shareHistory} />

    );
    // mock slider change by calling onChange method
    wrapper.instance().handleVolumeSliderChange(0.5);
    expect(wrapper.instance().state.volume).toEqual('0.50');
    expect(wrapper.find('ReactHowler').instance().props.volume).toEqual('0.50');

  })
})
/*
User Story #15
As a user, I would like to be able to
create a separate favorite playlist.
*/
describe('User Story #15', () => {

  it('creates a new play list', () => {
    let wrapper = mount(
      <Provider store={createStore(rootReducer)}>
        <MemoryRouter initialEntries={[ '/player' ]}>
        {/* shareHistory below inputs the mock url */}
        <Sidebar user={typicalUser} settings={typicalSettings} packages={mockPackages} history={shareHistory} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find(Sidebar).instance().receivedSharingPlaylistName).toEqual('LOL');


})
})
/*
User Story #16
As a user, I would like to be able to delete songs from playlist
*/
describe('User Story #16', () => {

  it('deletes a song', () => {


  })
})
/*
User Story #17
As a user, I would like to be able to
switch listening mode of the playlist like random, single, or in order.
*/
describe('User Story #17', () => {

  it('change the playmode', () => {
    let wrapper = mount(
      <MusicPlayer user={typicalUser} settings={typicalSettings} packages={mockPackages} history={shareHistory} />

    );
    //console.log(wrapper.instance());
    wrapper.instance().setPlayMode();
    expect(wrapper.instance().state.currentPlayMode).toBe('shuffle');

  })
})
/*
User Story #20
As a user, I would like to be able to see the song
image in the player interface.
*/
describe('User Story #20', () => {

  it('changes song image src', () => {
    let wrapper = shallow(<PlayerPage user={typicalUser} settings={typicalSettings} packages={mockPackages} history={typicalHistory} />);

    wrapper.setState({cover: mockImage});

    expect(wrapper.find('.player-page-cover').get(0).props.src).toEqual(mockImage);
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
      {/* shareHistory below inputs the mock url */}
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
    // Mock sidebar toggle onclick function
    let setSidebarOpenState = (state, wrapper) => {
      wrapper.setProps({settings: {isSidebarOpen: state}})
    }
    let wrapper = shallow(<NavBar user={typicalUser} settings={mockClosedSidebar} history={typicalHistory} setSidebarOpenState={() => setSidebarOpenState(true, wrapper)} />);

    expect(wrapper.instance().props.settings.isSidebarOpen).toEqual(false);
    wrapper.find(Navbar.Toggle).simulate('click');
    expect(wrapper.instance().props.settings.isSidebarOpen).toEqual(true);
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
/*
User Story #28
As a user, I would like to be able to add the selected song
to a different playlist on the hover menu
*/
describe('User Story #28', () => {

  it('adds the selected song to a different playlis', () => {

  })
})
/*
User Story #30
As a user, I would like to be able to change the progress of a song by dragging the progress bar
*/
describe('User Story #30', () => {

  it('change playing progress', () => {
    let wrapper = mount(
      <MusicPlayer user={typicalUser} settings={typicalSettings} packages={mockPackages} history={shareHistory} />

    );

    wrapper.instance().setProgress(50);
    expect(wrapper.instance().state.progress).toEqual(50);

  })
})
