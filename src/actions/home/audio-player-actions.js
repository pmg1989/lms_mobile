import { AUDIO_CHANGE_INDEX, AUDIO_CHANGE_PLAYING, AUDIO_CHANGE_PREV, AUDIO_CHANGE_NEXT } from 'constants/home-constants'

export const changeIndex = index => ({ index, type: AUDIO_CHANGE_INDEX })

export const changePlaying = () => ({ type: AUDIO_CHANGE_PLAYING })

export const toPrev = () => ({ type: AUDIO_CHANGE_PREV })

export const toNext = () => ({ type: AUDIO_CHANGE_NEXT })
