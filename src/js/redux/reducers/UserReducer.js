import {
  USER_LOGIN,
  USER_LOGOUT
} from '../actions';

const initialState = {
  email: null,
  name: null,
  profilePicURL: null
}

const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        payload
      }
    case USER_LOGOUT:
      return {
        ...state,
        email: null,
        name: null,
        profilePicURL: null
      }
    default:
      return state
  }
}

export default UserReducer;
