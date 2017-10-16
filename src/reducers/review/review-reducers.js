import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { reviewConstants } from 'constants'

const $progress = Immutable.fromJS({
  info: {},
  comment: {},
})

const progress = createReducer($progress, {
  [reviewConstants.FETCH_REVIEW_INFO] (state, action) {
    return state.set('info', action.info).set('comment', action.comment)
  },
})

export default progress
