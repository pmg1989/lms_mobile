import { AUDIO_CHANGE_INDEX, AUDIO_CHANGE_PLAY, AUDIO_CHANGE_PAUSE, AUDIO_CHANGE_PREV, AUDIO_CHANGE_NEXT, AUDIO_CHANGE_SWITCH } from 'constants/home-constants'

export const changeIndex = index => ({ index, type: AUDIO_CHANGE_INDEX })

export const changePlay = () => ({ type: AUDIO_CHANGE_PLAY })

export const changePause = () => ({ type: AUDIO_CHANGE_PAUSE })

export const toPrev = () => ({ type: AUDIO_CHANGE_PREV })

export const toNext = () => ({ type: AUDIO_CHANGE_NEXT })

export const changeSwitching = () => ({ type: AUDIO_CHANGE_SWITCH })
