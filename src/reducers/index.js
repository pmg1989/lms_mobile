import { combineReducers } from 'redux-immutable'
import routing from './route-reducers'

import app from './app'
import home from './home'

export default combineReducers({
  routing,
  app,
  home,
})
