import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { feedbackConstants } from 'constants'

const $feedback = Immutable.fromJS({
  info: {
  },
  lessons: [],
})

const feedback = createReducer($feedback, {
  [feedbackConstants.FETCH_FEEDBACK_LIST] (state, action) {
    return state.set('info', action.info).set('lessons', action.lessons)
  },
})

export default feedback
