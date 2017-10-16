import Immutable from 'immutable'
import { progressConstants } from 'constants'
import { fetchProgressInfo, fetchCancelLession } from 'services/progress'

const receiveProgressInfo = data => ({
  info: Immutable.fromJS(data.info),
  lessons: Immutable.fromJS(data.lessons),
  type: progressConstants.FETCH_PROGRESS_INFO,
})

export const getProgressInfo = (ccid, courseType) => (
  dispatch => (
    fetchProgressInfo({ ccid, category_idnumber: courseType }).then(({ data }) => ({
      info: {
        category_summary: data.category_summary,
        category_idnumber: data.category_idnumber,
        attendedlesson_cnt: data.attendedlesson_cnt,
        contractlesson_cnt: data.contractlesson_cnt,
        contract_deadline: data.contract_deadline,
        currentlesson_available: data.currentlesson_available,
        currentlesson_id: data.currentlesson_id,
        contract_freezeend: data.contract_freezeend,
        contract_freezestart: data.contract_freezestart,
        tofeedback: data.tofeedback,
      },
      lessons: data.lessons,
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
