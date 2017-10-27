import { combineReducers } from 'redux-immutable'

import list from './practice-list-reducers'
import detail from './practice-detail-reducers'

export default combineReducers({
  list,
  detail,
})
