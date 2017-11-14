import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_PLAYLISTS,
  PLAY_MUSIC,
  PLAY_PLAYLIST,
  STOP_PLAY,
  START_PLAY,
  SET_MUTE,
  SET_UNMUTE,
} from './actionTypes';

/**
* Save user data to redux
* @param: user(Google login user basic profile)
*/
export const userLogin = user => {
  return dispatch => dispatch({
    type: USER_LOGIN,
    name: user.getName(),
    profilePicURL: user.getImageUrl()
  });
};

/**
* Log out and remove user data to redux
*/
export const userLogout = () => {
  return (dispatch, getState) => {
    const { gapi, firebase } = getState().packages;

    gapi.auth2.getAuthInstance().signOut().then(() => {
      firebase.auth().signOut().then(() => {
        return dispatch({
          type: USER_LOGOUT,
          name: null,
          profilePicURL: null
        });
      });
    })
  }
};

/**
* Save user playlists into redux
* @param: playlists(Firebase data snapshot val())
*/
export const setPlaylists = playlists => {
  return dispatch => dispatch({
    type: SET_PLAYLISTS,
    playlists
  });
};

/**
* Save user's currently playing music id to redux
* @param: id(string)
*/
export const setPlayingPlaylist= playlistName => {
  return dispatch => dispatch({
    type: PLAY_PLAYLIST,
    playlistName
  });
};

/**
* Save user's currently playing music id to redux
* @param: id(string)
*/
export const setPlayingMusicId = id => {
  return dispatch => dispatch({
    type: PLAY_MUSIC,
    id
  });
};

export const startPlaying = () => {
  return dispatch => dispatch({
    type: START_PLAY,
  });
};

export const stopPlaying = () => {
  return dispatch => dispatch({
    type: STOP_PLAY,
  });
};

export const setMute = () => {
  return dispatch => dispatch({
    type: SET_MUTE,
  });
};


export const setUnmute = () => {
  return dispatch => dispatch({
    type: SET_UNMUTE,
  });
};
