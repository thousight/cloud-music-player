import {
  USER_LOGIN,
  USER_LOGOUT
} from '../actions';

const initialState = {
  name: null,
  profilePicURL: null
}

const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN:
    console.log('user reducer: ', payload);
      return {
        ...state,
        name: payload.name,
        profilePicURL: payload.profilePicURL
      }
    case USER_LOGOUT:
      return {
        ...state,
        name: null,
        profilePicURL: null
      }
    default:
      return state
  }
}

export default UserReducer;
