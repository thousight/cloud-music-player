import { combineReducers } from 'redux'

// Reducers
import UserReducer from './UserReducer'
import PackageReducer from './PackageReducer'
import SettingsReducer from './SettingsReducer'


const rootReducer = combineReducers({
  user: UserReducer,
  packages: PackageReducer,
  settings: SettingsReducer
})

export default rootReducer
