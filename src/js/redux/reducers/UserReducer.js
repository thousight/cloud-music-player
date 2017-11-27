import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_PLAYLISTS,
  PLAY_MUSIC,
  PLAY_PLAYLIST,
  START_PLAY,
  STOP_PLAY,
  SET_MUTE,
  SET_UNMUTE,
  SET_PLAYLIST
} from '../actions';

const initialState = {
  name: null,
  profilePicURL: null,
  playlists: {},
  currentlyPlayingMusicId: '',
  currentlyPlayingPlaylistName: '',
  isPlaying: false,
  isMute: true,
  currentlyPlayingPlaylist: {},
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
        isPlaying: true,
        isMute: false
      }
    case STOP_PLAY:
      return {
        ...state,
        isPlaying: false,
      }
    case SET_MUTE:
      return{
        ...state,
        isMute: true
      }
    case SET_UNMUTE:
      return{
        ...state,
        isMute: false
      }
    case SET_PLAYLIST:
      return {
        ...state,
        currentlyPlayingPlaylist: action.playlist
      }
    default:
      return state
  }
}

export default UserReducer;
