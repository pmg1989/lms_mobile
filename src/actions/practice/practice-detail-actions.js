import Immutable from 'immutable'
import { practiceConstants } from 'constants'
import { fetchPracticeItem } from 'services/practice'

const receivePracticeItem = data => ({
  audios: Immutable.fromJS(data.audios),
  info: Immutable.fromJS(data.info),
  type: practiceConstants.FETCH_PRACTICE_ITEM,
})

export const getPracticeItem = categoryId => (
  dispatch => (
    fetchPracticeItem({ category_idnumber: categoryId })
    .then(({ data: { history } }) => {
      const { audios, ...info } = history[0]
      return {
        audios,
        info,
      }
    }).then(data => dispatch(receivePracticeItem(data)))
  )
)
