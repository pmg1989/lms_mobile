import { combineReducers } from 'redux-immutable'
import routing from './route-reducers'

import home from './home'

export default combineReducers({
  home,
  routing,
})
