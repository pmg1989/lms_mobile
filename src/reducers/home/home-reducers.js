import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { homeConstants } from 'constants'
import audioPlayer from './audio-player-reducers'

const $studyList = Immutable.fromJS([])

const studyList = createReducer($studyList, {
  [homeConstants.FETCH_STUDYLIST] (state, action) {
    return state.merge(action.list)
  },
})

const $notice = Immutable.fromJS({
  title: '',
})

const notice = createReducer($notice, {
  [homeConstants.FETCH_NOTICE] (state, action) {
    return state.merge(action.item)
  },
})

export default combineReducers({
  notice,
  studyList,
  audioPlayer,
})
