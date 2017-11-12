import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_PLAYLISTS,
  PLAY_MUSIC,
  PLAY_PLAYLIST,
  START_PLAY,
  STOP_PLAY
} from '../actions';

const initialState = {
  name: null,
  profilePicURL: null,
  playlists: {},
  currentlyPlayingMusicId: '',
  currentlyPlayingPlaylistName: '',
  isPlaying: false
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        name: action.name,
        profilePicURL: action.profilePicURL
      }
    case USER_LOGOUT:
      return {
        ...state,
        name: null,
        profilePicURL: null
      }
    case SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists
      }
    case PLAY_MUSIC:
      return {
        ...state,
        currentlyPlayingMusicId: action.id
      }
    case PLAY_PLAYLIST:
      return {
        ...state,
        currentlyPlayingPlaylistName: action.playlistName
      }
    case START_PLAY:
      return {
        ...state,
        isPlaying: true
      }
    case STOP_PLAY:
      return {
        ...state,
        isPlaying: false
      }
    default:
      return state
  }
}

export default UserReducer;
