import Immutable from 'immutable'
import { reviewConstants } from 'constants'
import { fetchReviewInfo } from 'services/review'

const receiveReviewInfo = data => ({
  info: Immutable.fromJS(data.info),
  comment: Immutable.fromJS(data.comment),
  type: reviewConstants.FETCH_REVIEW_INFO,
})

export const getReviewInfo = (lessonid, userid) => (
  dispatch => (
    fetchReviewInfo({ lessonid, userid }).then(res => ({
      info: {
        ...res.data.lesson_info,
        gradetime: res.data.gradetime,
      },
      comment: res.data.commenttext,
    })).then(data => dispatch(receiveReviewInfo(data)))
  )
)
