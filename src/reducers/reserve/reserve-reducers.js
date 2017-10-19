import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { reserveConstants } from 'constants'

const $reserve = Immutable.fromJS({
  info: {},
  list: [],
})

const reserve = createReducer($reserve, {
  [reserveConstants.FETCH_RESERVE_LIST] (state, action) {
    return state.set('info', action.info).set('list', action.list)
  },
})

export default reserve
