import Immutable from 'immutable'
import { homeConstants } from 'constants'
import { fetchNotice, fetchCourseList, fetchRecordList } from 'services/home'

const receiveNotice = data => ({
  data: Immutable.fromJS(data),
  type: homeConstants.FETCH_NOTICE,
})

export const getNotice = () => (
  dispatch => (
    fetchNotice().then(({ data }) => {
      return {
        content: data.name,
        link: data.content,
      }
    }).then(data => dispatch(receiveNotice(data)))
  )
)

const receiveCourseList = list => ({
  list: Immutable.fromJS(list),
  type: homeConstants.FETCH_COURSE_LIST,
})

export const getCourseList = userid => (
  dispatch => (
    fetchCourseList({ userid }).then(({ data }) => ({
      commingList: data.comminglist,
      studingList: data.studinglist,
      passedList: data.passedlist,
      feedbackList: data.feedbacklist,
    })).then(list => dispatch(receiveCourseList(list)))
  )
)

const receiveRecordList = list => ({
  list: Immutable.fromJS(list),
  type: homeConstants.FETCH_RECORD_LIST,
})

export const getRecordList = (userid, avatar) => (
  dispatch => (
    fetchRecordList({ userid }).then(({ data }) => {
      return data.map(item => ({
        title: item.name,
        author: item.owner,
        thumb: avatar,
        source: item.url,
      }))
    }).then(list => dispatch(receiveRecordList(list)))
  )
)
