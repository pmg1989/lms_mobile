import { combineReducers } from 'redux-immutable'
import routing from './route-reducers'

import app from './app'
import home from './home'
import progress from './progress'
import review from './review'

export default combineReducers({
  routing,
  app,
  home,
  progress,
  review,
})
