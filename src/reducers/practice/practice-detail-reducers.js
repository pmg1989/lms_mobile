import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { practiceConstants } from 'constants'
import { defaultImage } from 'utils/config'

const $practiceDetail = Immutable.fromJS({
  info: {
    cover: defaultImage,
  },
})

const practiceDetail = createReducer($practiceDetail, {
  [practiceConstants.FETCH_PRACTICE_ITEM] (state, action) {
    return state.set('info', action.info)
  },
})

export default practiceDetail
