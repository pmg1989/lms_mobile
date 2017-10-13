import Immutable from 'immutable'
import { progressConstants } from 'constants'
import { fetchProgressInfo } from 'services/progress'

const receiveProgressInfo = data => ({
  info: Immutable.fromJS(data.info),
  lessons: Immutable.fromJS(data.lessons),
  type: progressConstants.FETCH_PROGRESS_INFO,
})

export const getProgressInfo = (ccid, courseType) => (
  dispatch => (
    fetchProgressInfo({ ccid, category_idnumber: courseType }).then(res => ({
      info: {
        title: res.data.category_summary,
      },
      lessons: res.data.lessons,
    })).then(data => dispatch(receiveProgressInfo(data)))
  )
)
