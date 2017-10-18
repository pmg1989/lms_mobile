import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { feedbackConstants } from 'constants'

const $feedback = Immutable.fromJS({
  info: {},
  lessons: [],
  item: {
    lesson_prepare_score: '',
    lesson_content_score: '',
    teacher_appearance_score: '',
    lesson_interaction_score: '',
    teacher_expression_score: '',
    lesson_suggestion: '',
    teacher_suggestion: '',
  },
})

const feedback = createReducer($feedback, {
  [feedbackConstants.FETCH_FEEDBACK_LIST] (state, action) {
    return state.set('info', action.info).set('lessons', action.lessons)
  },
  [feedbackConstants.FETCH_FEEDBACK_ITEM] (state, action) {
    return state.set('item', action.item)
  },
})

export default feedback
