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
    fetchProgressInfo({ ccid, category_idnumber: courseType }).then(res => ({
      info: {
        category_summary: res.data.category_summary,
        category_idnumber: res.data.category_idnumber,
        attendedlesson_cnt: res.data.attendedlesson_cnt,
        contractlesson_cnt: res.data.contractlesson_cnt,
        contract_deadline: res.data.contract_deadline,
        currentlesson_available: res.data.currentlesson_available,
        currentlesson_id: res.data.currentlesson_id,
        contract_freezeend: res.data.contract_freezeend,
        contract_freezestart: res.data.contract_freezestart,
        tofeedback: res.data.tofeedback,
      },
      lessons: res.data.lessons,
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
