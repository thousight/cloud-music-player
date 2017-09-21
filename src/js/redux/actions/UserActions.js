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
    email: payload.profileObj.email,
    name: payload.profileObj.name,
    profilePicURL: payload.profileObj.imageUrl
	}
};

/**
* Remove user data to redux
*/
export const userLogout = () => {
  return {
		type: USER_LOGOUT,
    email: null,
    name: null,
    profilePicURL: null
	}
};
