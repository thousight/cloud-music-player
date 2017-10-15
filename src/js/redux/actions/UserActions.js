import {
  USER_LOGIN,
  USER_LOGOUT
} from './actionTypes';

/**
* Save user data to redux
* @param: payload(Google login user basic profile)
*/
export const userLogin = payload => {
  return dispatch => dispatch({
    type: USER_LOGIN,
    name: payload.getName(),
    profilePicURL: payload.getImageUrl()
  });
};

/**
* Remove user data to redux
*/
export const userLogout = () => {
  return dispatch => {
    require('google-client-api')().then(gapi => {
      gapi.auth2.getAuthInstance().signOut().then(() => {
        return dispatch({
      		type: USER_LOGOUT,
          name: null,
          profilePicURL: null
      	});
      })
    })
  }
};
