import Immutable from 'immutable'
import { homeConstants } from 'constants'
import { request } from 'utils/request'

const getRecordListSuccess = list => ({ list: Immutable.fromJS(list), type: homeConstants.FETCH_RECORDLIST_SUCCESS })

export const getRecordList = (userid, avatar) => (
  dispatch => (
    request({ wsfunction: 'mod_frontservice_get_student_recordings', userid }).then((json) => {
      const list = json.data
      return list.map(item => ({
        title: item.name,
        author: item.owner,
        thumb: avatar,
        source: item.url,
      }))
    }).then(data => dispatch(getRecordListSuccess(data)))
  )
)
