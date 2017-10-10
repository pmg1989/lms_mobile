import Immutable from 'immutable'
import { homeConstants } from 'constants'
import { fetchNotice, fetchCourseList, fetchRecordList } from 'services/home'

const receiveNotice = item => ({ item: Immutable.fromJS(item), type: homeConstants.FETCH_NOTICE })

export const getNotice = () => (
  dispatch => (
    fetchNotice().then((res) => {
      const item = res.data
      return {
        title: item.name,
        link: item.content,
      }
    }).then(item => dispatch(receiveNotice(item)))
  )
)

const receiveCourseList = list => ({ list: Immutable.fromJS(list), type: homeConstants.FETCH_COURSE_LIST })

export const getCourseList = (userid) => (
  dispatch => (
    fetchCourseList({ userid }).then((res) => ({
      commingList: res.data.comminglist,
      studingList: res.data.studinglist,
      passedList: res.data.passedlist,
    })).then(list => dispatch(receiveCourseList(list)))
  )
)

const receiveRecordList = list => ({ list: Immutable.fromJS(list), type: homeConstants.FETCH_RECORD_LIST })

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
