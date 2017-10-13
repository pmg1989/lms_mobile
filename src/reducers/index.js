import { combineReducers } from 'redux-immutable'
import routing from './route-reducers'

import app from './app'
import home from './home'
import progress from './progress'

export default combineReducers({
  routing,
  app,
  home,
  progress,
})
