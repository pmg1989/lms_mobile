import Immutable from 'immutable'
import { feedbackConstants } from 'constants'
import { fetchFeedbackList, fetchFeedbackItem, fetchSubmitFeedback, fetchFeedbackLesson } from 'services/feedback'

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

const receiveFeedbackItem = item => ({
  item: Immutable.fromJS(item),
  type: feedbackConstants.FETCH_FEEDBACK_ITEM,
})

export const getFeedbackItem = lessonid => (
  dispatch => (
    fetchFeedbackItem({ lessonid })
    .then(({ data }) => data.onlinetext.weekly)
    .then(item => dispatch(receiveFeedbackItem(item)))
  )
)

const receiveFeedbackLesson = lesson => ({
  lesson: Immutable.fromJS(lesson),
  type: feedbackConstants.FETCH_FEEDBACK_LESSON,
})

export const getFeedbackLesson = lessonid => (
  dispatch => (
    fetchFeedbackLesson({ lessonid })
    .then(({ data }) => ({
      category: data.category,
      category_idnumber: data.category_idnumber,
      category_summary: data.category_summary,
      teacher: data.teacher,
      available: data.available,
    }))
    .then(lesson => dispatch(receiveFeedbackLesson(lesson)))
  )
)

export const resetFeedbackItem = () => ({
  type: feedbackConstants.RESET_FEEDBACK_ITEM,
})

export const submitFeedback = params => (
  () => (
    fetchSubmitFeedback(params)
    .then(res => res)
  )
)
