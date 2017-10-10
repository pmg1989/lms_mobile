import Immutable from 'immutable'
import { homeConstants } from 'constants'
import { fetchNotice, fetchRecordList } from 'services/home'

const receiveNotice = item => ({ item: Immutable.fromJS(item), type: homeConstants.FETCH_NOTICE })

export const getNotice = () => (
  dispatch => (
    fetchNotice().then((res) => {
      const item = res.data
      return {
        title: item.name,
      }
    }).then(item => dispatch(receiveNotice(item)))
  )
)

const receiveRecordList = list => ({ list: Immutable.fromJS(list), type: homeConstants.FETCH_RECORDLIST })

export const getRecordList = (userid, avatar) => (
  dispatch => (
    fetchRecordList({ userid }).then((res) => {
      const list = res.data
      return list.map(item => ({
        title: item.name,
        author: item.owner,
        thumb: avatar,
        source: item.url,
      }))
    }).then(list => dispatch(receiveRecordList(list)))
  )
)
