import Immutable from 'immutable'
import moment from 'moment'
import { reserveConstants } from 'constants'
import { fetchReserveList, fetchSubmitReserve, fetchConfirmReserve } from 'services/reserve'

const receiveReserveList = data => ({
  info: Immutable.fromJS(data.info),
  dayOfLessons: Immutable.fromJS(data.dayOfLessons),
  type: reserveConstants.FETCH_RESERVE_LIST,
})

export const getReserveList = (ccid, categoryIdnumber) => (
  dispatch => (
    fetchReserveList({ ccid, category_idnumber: categoryIdnumber })
    .then(({ data: { list, ...info } }) => {
      const dayOfLessons = {}
      list.map((item) => {
        const month = moment.unix(item.available).format('YYYY / MM')
        const day = moment.unix(item.available).format('D')
        if (!dayOfLessons[month]) {
          dayOfLessons[month] = {}
        }
        if (!dayOfLessons[month][day]) {
          dayOfLessons[month][day] = []
        }
        dayOfLessons[month][day].push({
          label: moment.unix(item.available).format('HH:mm'),
          date: moment.unix(item.available).format('YYYY-MM-DD'),
          lessonId: item.id,
          num_student: item.num_student,
          lower_limit: item.lower_limit,
        })
        return dayOfLessons
      })
      return {
        info: {
          ...info,
          monthDays: moment().endOf('month'),
          monthName: moment().format('YYYY / MM'),
        },
        dayOfLessons,
      }
    }).then(data => dispatch(receiveReserveList(data)))
  )
)

export const confirmReserve = (lessonid, forms) => (
  () => (
    fetchConfirmReserve({ lessonid, ...forms })
    .then(res => res)
  )
)

export const submitReserve = (lessonid, ccid, categoryIdnumber) => (
  () => (
    fetchSubmitReserve({ lessonid, ccid, category_idnumber: categoryIdnumber })
    .then(res => res)
  )
)
