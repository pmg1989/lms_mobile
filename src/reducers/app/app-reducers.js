import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { appConstants } from 'constants'

const $app = Immutable.fromJS({
  ...JSON.parse(localStorage.getItem(appConstants.USER_INFO)),
  image: './images/avatar.png',
})

const app = createReducer($app, {
  [appConstants.AUTH_LOGIN] (state, action) {
    return state.merge(action.app)
  },
})

export default app
