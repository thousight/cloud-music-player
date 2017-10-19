import {
  SIDEBAR_OPEN
} from '../actions';

const initialState = {
  isSidebarOpen: true
}

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return {
        ...state,
        isSidebarOpen: action.isSidebarOpen
      }
    default:
      return state
  }
}

export default SettingsReducer;
