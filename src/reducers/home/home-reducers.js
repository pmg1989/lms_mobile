import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { homeConstants } from 'constants'
import audioPlayer from './audio-player-reducers'

const $notice = Immutable.fromJS({
  title: '',
})

const notice = createReducer($notice, {
  [homeConstants.FETCH_NOTICE] (state, action) {
    return state.merge(action.item)
  },
})

const $course = Immutable.fromJS({
  commingList: [],
  studingList: [],
  passedList: [],
})

const course = createReducer($course, {
  [homeConstants.FETCH_COURSE_LIST] (state, action) {
    return state.merge(action.list)
  },
})

export default combineReducers({
  notice,
  course,
  audioPlayer,
})
