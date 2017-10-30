import Immutable from 'immutable'
import { practiceConstants, audioPlayerConstants } from 'constants'
import { fetchPracticeItem } from 'services/practice'


const receivePracticeItem = list => ({
  list: Immutable.fromJS(list),
  type: audioPlayerConstants.FETCH_RECORD_LIST,
})

const receivePracticeInfo = info => ({
  info: Immutable.fromJS(info),
  type: practiceConstants.FETCH_PRACTICE_ITEM,
})

export const getPracticeItem = categoryId => (
  dispatch => (
    fetchPracticeItem({ category_idnumber: categoryId })
    .then(({ data: { history } }) => {
      const { audios, ...info } = history[0]
      return {
        list: audios.map(item => ({
          title: item.audio_name,
          author: 'demo',
          thumb: 'https://o9u2lnvze.qnssl.com/upload/d260b7a5f9c149481fc62821995123cd.jpg?1493097035',
          source: item.audio_url,
        })),
        info,
      }
    }).then(({ list, info }) => {
      dispatch(receivePracticeItem(list))
      dispatch(receivePracticeInfo(info))
    })
  )
)
