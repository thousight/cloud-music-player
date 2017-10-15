import {
  UPDATE_ROUTE
} from '../actions';

const initialState = {
  route: ''
}

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ROUTE:
      return {
        ...state,
        route: action.route
      }
    default:
      return state
  }
}

export default SettingsReducer;
