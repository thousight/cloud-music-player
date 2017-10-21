import {
  SIDEBAR_OPEN
} from './actionTypes';

/**
* Toggle sidebar open or not
* @param: isSidebarOpen(boolean)
*/
export const setSidebarOpenState = isSidebarOpen => {
  return {
		type: SIDEBAR_OPEN,
    isSidebarOpen
	}
};
