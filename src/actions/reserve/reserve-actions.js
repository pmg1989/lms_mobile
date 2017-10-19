import Immutable from 'immutable'
import moment from 'moment'
import { reserveConstants } from 'constants'
import { fetchReserveList } from 'services/reserve'

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
          dayOfLessons[month][day] = { selected: false, lessons: [] }
        }
        dayOfLessons[month][day].lessons.push({
          label: moment.unix(item.available).format('HH:mm'),
          lessonId: item.id,
          num_student: item.num_student,
          lower_limit: item.lower_limit,
        })
        return dayOfLessons
      })
      return {
        info,
        dayOfLessons,
      }
    }).then(data => dispatch(receiveReserveList(data)))
  )
)
