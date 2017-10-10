import { combineReducers } from 'redux-immutable'
import * as homeReducers from './home-reducers'
import audioPlayer from './audio-player-reducers'

export default combineReducers({
  ...homeReducers,
  audioPlayer,
})
