import Immutable from 'immutable'
import { practiceConstants } from 'constants'
import { fetchPracticeList } from 'services/practice'

const receivePracticeList = data => ({
  history: Immutable.fromJS(data.history),
  list: Immutable.fromJS(data.list),
  type: practiceConstants.FETCH_PRACTICE_LIST,
})

export const getPracticeList = categoryId => (
  dispatch => (
    fetchPracticeList({ category_idnumber: categoryId })
    .then(({ data: { history, list } }) => ({
      history,
      list,
    })).then(data => dispatch(receivePracticeList(data)))
  )
)
