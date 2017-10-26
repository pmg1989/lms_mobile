import { combineReducers } from 'redux-immutable'
import routing from './route-reducers'

import app from './app'
import home from './home'
import progress from './progress'
import review from './review'
import feedback from './feedback'
import reserve from './reserve'
import practice from './practice'

export default combineReducers({
  routing,
  app,
  home,
  progress,
  feedback,
  review,
  reserve,
  practice,
})
