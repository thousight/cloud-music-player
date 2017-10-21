import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_PLAYLISTS
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
