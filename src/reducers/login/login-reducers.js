import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { loginConstants } from 'constants'

const $login = Immutable.fromJS({
  loading: {},
  smsStatus: 0,
  sid: 0,
})

const login = createReducer($login, {
  [loginConstants.FETCH_SEND_SMS] (state, action) {
    return state.merge(action.login)
  },
  [loginConstants.RESET_SEND_SMS] (state) {
    return state.set('smsStatus', 0).set('sid', 0)
  },
  [loginConstants.SHOW_LOADING] (state, action) {
    return state.set('loading', state.get('loading').merge(action.model))
  },
  [loginConstants.HIDE_LOADING] (state, action) {
    return state.set('loading', state.get('loading').merge(action.model))
  },
})

export default login
