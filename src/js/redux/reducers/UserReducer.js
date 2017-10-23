import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_PLAYLISTS,
  PLAY_MUSIC
} from '../actions';

const initialState = {
  name: null,
  profilePicURL: null,
  playlists: {},
  currentlyPlayingMusicId: ''
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
    case SET_PLAYLISTS:
      return {
        ...state,
        currentlyPlayingMusicId: action.id
      }
    default:
      return state
  }
}

export default UserReducer;
