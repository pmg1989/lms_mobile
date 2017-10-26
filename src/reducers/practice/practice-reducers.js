import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { practiceConstants } from 'constants'

const $practice = Immutable.fromJS({
  history: [],
  list: [],
})

const practice = createReducer($practice, {
  [practiceConstants.FETCH_PRACTICE_LIST] (state, action) {
    return state.set('history', action.history).set('list', action.list)
  },
})

export default practice
