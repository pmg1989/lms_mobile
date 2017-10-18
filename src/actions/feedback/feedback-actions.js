import Immutable from 'immutable'
import { feedbackConstants } from 'constants'
import { fetchFeedbackList } from 'services/feedback'

const receiveFeedbackList = data => ({
  info: Immutable.fromJS(data.info),
  lessons: Immutable.fromJS(data.lessons),
  type: feedbackConstants.FETCH_FEEDBACK_LIST,
})

export const getFeedbackList = (ccid, categoryId) => (
  dispatch => (
    fetchFeedbackList({ ccid, category_idnumber: categoryId })
    .then(({ data: { lessons, ...info } }) => ({
      info,
      lessons,
    })).then(data => dispatch(receiveFeedbackList(data)))
  )
)
