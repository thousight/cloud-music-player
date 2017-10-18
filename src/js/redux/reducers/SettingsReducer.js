import {
  UPDATE_ROUTE
} from '../actions';

const initialState = {
  currentRoute: ''
}

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ROUTE:
      return {
        ...state,
        currentRoute: action.route
      }
    default:
      return state
  }
}

export default SettingsReducer;
