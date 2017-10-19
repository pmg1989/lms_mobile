import Immutable from 'immutable'
import { reserveConstants } from 'constants'
import { fetchReserveList } from 'services/reserve'

const receiveReserveList = data => ({
  info: Immutable.fromJS(data.info),
  list: Immutable.fromJS(data.list),
  type: reserveConstants.FETCH_RESERVE_LIST,
})

export const getReserveList = (ccid, categoryIdnumber) => (
  dispatch => (
    fetchReserveList({ ccid, category_idnumber: categoryIdnumber })
    .then(({ data: { list, ...info } }) => ({
      info,
      list,
    })).then(data => dispatch(receiveReserveList(data)))
  )
)
