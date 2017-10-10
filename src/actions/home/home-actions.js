import Immutable from 'immutable'
import { homeConstants } from 'constants'
import { request } from 'utils/request'

const getNoticeSuccess = item => ({ item: Immutable.fromJS(item), type: homeConstants.FETCH_NOTICE_SUCCESS })

export const getNotice = () => (
  dispatch => (
    request({ wsfunction: 'mod_frontservice_get_ads' }).then((res) => {
      const item = res.data
      return {
        title: item.name,
      }
    }).then(item => dispatch(getNoticeSuccess(item)))
  )
)

const getRecordListSuccess = list => ({ list: Immutable.fromJS(list), type: homeConstants.FETCH_RECORDLIST_SUCCESS })

export const getRecordList = (userid, avatar) => (
  dispatch => (
    request({ wsfunction: 'mod_frontservice_get_student_recordings', userid }).then((res) => {
      const list = res.data
      return list.map(item => ({
        title: item.name,
        author: item.owner,
        thumb: avatar,
        source: item.url,
      }))
    }).then(list => dispatch(getRecordListSuccess(list)))
  )
)
