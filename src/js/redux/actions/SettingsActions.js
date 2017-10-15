import {
  UPDATE_ROUTE
} from './actionTypes';

/**
* Update user current routing
* @param: route (string of route: '' for Home, 'import' for ImportPage, 'player' for MusicPlayerPage)
*/
export const updateRoute = route => {
  return dispatch => dispatch({
    type: UPDATE_ROUTE,
    route
  });
};
