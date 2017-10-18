import Immutable from 'immutable'
import { progressConstants } from 'constants'
import { fetchProgressInfo, fetchCancelLession } from 'services/progress'

const receiveProgressInfo = data => ({
  info: Immutable.fromJS(data.info),
  lessons: Immutable.fromJS(data.lessons),
  type: progressConstants.FETCH_PROGRESS_INFO,
})

export const getProgressInfo = (ccid, categoryId) => (
  dispatch => (
    fetchProgressInfo({ ccid, category_idnumber: categoryId }).then(({ data: { lessons, ...info } }) => ({
      info,
      lessons,
    })).then(data => dispatch(receiveProgressInfo(data)))
  )
)

const receiveCancelLession = index => ({
  index,
  type: progressConstants.FETCH_CANCEL_LESSION,
})

export const cancelLession = (lessonid, userid, rolename, index) => (
  dispatch => (
    fetchCancelLession({ lessonid, userid, rolename })
    .then(() => dispatch(receiveCancelLession(index)))
  )
)
