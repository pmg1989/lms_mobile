import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { homeConstants } from 'constants'
import audioPlayer from './audio-player-reducers'

const $studyList = Immutable.fromJS([])

const studyList = createReducer($studyList, {
  [homeConstants.FETCH_STUDYLIST_SUCCESS] (state, action) {
    return state.merge(action.list)
  },
})

const $notice = Immutable.fromJS({
  title: '',
})

const notice = createReducer($notice, {
  [homeConstants.FETCH_NOTICE_SUCCESS] (state, action) {
    return state.set('title', action.item.get('title'))
  },
})

export default combineReducers({
  notice,
  studyList,
  audioPlayer,
})
