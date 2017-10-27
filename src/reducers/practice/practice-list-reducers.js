import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { practiceConstants } from 'constants'

const $practice = Immutable.fromJS({
  history: [],
  list: [],
  curLessons: [],
  idnumber: '',
})

const practice = createReducer($practice, {
  [practiceConstants.FETCH_PRACTICE_LIST] (state, action) {
    return state.set('history', action.history).set('list', action.list)
  },
  [practiceConstants.CHANGE_CUR_LESSONS] (state, action) {
    return state.set('curLessons', action.curLessons).set('idnumber', action.idnumber)
  },
})

export default practice
