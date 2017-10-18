import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { homeConstants } from 'constants'
import audioPlayer from './audio-player-reducers'

const $notice = Immutable.fromJS({
  title: '牛班公告',
  content: '',
})

const notice = createReducer($notice, {
  [homeConstants.FETCH_NOTICE] (state, action) {
    return state.merge(action.data)
  },
})

const $course = Immutable.fromJS({
  commingList: [],
  studingList: [],
  passedList: [],
})

const course = createReducer($course, {
  [homeConstants.FETCH_COURSE_LIST] (state, { list }) {
    return state.set('commingList', list.get('commingList'))
                .set('studingList', list.get('studingList'))
                .set('passedList', list.get('passedList'))
  },
})

const $feedbackList = Immutable.fromJS([])

const feedbackList = createReducer($feedbackList, {
  [homeConstants.FETCH_COURSE_LIST] (state, { list }) {
    return list.get('feedbackList')
  },
})

export default combineReducers({
  notice,
  course,
  feedbackList,
  audioPlayer,
})
