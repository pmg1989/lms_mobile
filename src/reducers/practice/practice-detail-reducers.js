import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { practiceConstants } from 'constants'

const $practiceDetail = Immutable.fromJS({
  audios: [],
  info: {},
})

const practiceDetail = createReducer($practiceDetail, {
  [practiceConstants.FETCH_PRACTICE_ITEM] (state, action) {
    return state.set('audios', action.audios).set('info', action.info)
  },
})

export default practiceDetail
