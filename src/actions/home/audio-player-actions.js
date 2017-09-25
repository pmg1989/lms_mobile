import { AUDIO_CHANGE_INDEX, AUDIO_CHANGE_PLAYING, AUDIO_CHANGE_PREV, AUDIO_CHANGE_NEXT } from 'constants/home-constants'

export const changeIndex = index => ({ index, type: AUDIO_CHANGE_INDEX })

export const changePlaying = playing => ({ playing, type: AUDIO_CHANGE_PLAYING })

export const prev = listSize => ({ listSize, type: AUDIO_CHANGE_PREV })

export const toPrev = () => (dispatch, getState) => {
  dispatch(prev(getState().getIn(['home', 'audioPlayer', 'list']).size))
}

export const next = listSize => ({ listSize, type: AUDIO_CHANGE_NEXT })

export const toNext = () => (dispatch, getState) => {
  dispatch(next(getState().getIn(['home', 'audioPlayer', 'list']).size))
}
