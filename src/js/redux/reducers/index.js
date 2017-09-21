import { combineReducers } from 'redux'

// Reducers
import UserReducer from './UserReducer'


const rootReducer = combineReducers({
  user: UserReducer,
})

export default rootReducer
