import {
  USER_LOGIN,
  USER_LOGOUT
} from './actionTypes';

/**
* Save user data to redux
* @param: payload(Google login success response)
*/
export const userLogin = payload => {
  return {
		type: USER_LOGIN,
    name: payload.getName(),
    profilePicURL: payload.getImageUrl()
	}
};

/**
* Remove user data to redux
*/
export const userLogout = () => {
  window.gapi.auth2.getAuthInstance().signOut().then(() => {
    return {
  		type: USER_LOGOUT,
      name: null,
      profilePicURL: null
  	}
  })
};
