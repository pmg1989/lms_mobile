import { combineReducers } from 'redux-immutable'
import routing from './route-reducers'

import app from './app'
import login from './login'
import home from './home'
import progress from './progress'
import review from './review'
import feedback from './feedback'
import reserve from './reserve'
import practice from './practice'
import audioPlayer from './audio-player'

export default combineReducers({
  routing,
  app,
  login,
  home,
  progress,
  feedback,
  review,
  reserve,
  practice,
  audioPlayer,
})
