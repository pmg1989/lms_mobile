import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { progressConstants } from 'constants'

const $progress = Immutable.fromJS({
  info: {
    title: '',
    category_idnumber: '',
    hasFeedback: false,
  },
  lessons: [],
})

const progress = createReducer($progress, {
  [progressConstants.FETCH_PROGRESS_INFO] (state, action) {
    return state.set('info', action.info).set('lessons', action.lessons)
  },
  [progressConstants.FETCH_CANCEL_LESSION] (state, action) {
    return state.deleteIn(['lessons', action.index])
  },
})

export default progress
