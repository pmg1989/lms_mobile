import { audioPlayerConstants } from 'constants'

export const changeIndex = index => ({ index, type: audioPlayerConstants.AUDIO_CHANGE_INDEX })

export const changePlay = () => ({ type: audioPlayerConstants.AUDIO_CHANGE_PLAY })

export const changePause = () => ({ type: audioPlayerConstants.AUDIO_CHANGE_PAUSE })

export const toPrev = () => ({ type: audioPlayerConstants.AUDIO_CHANGE_PREV })

export const toNext = () => ({ type: audioPlayerConstants.AUDIO_CHANGE_NEXT })

export const changeSwitching = () => ({ type: audioPlayerConstants.AUDIO_CHANGE_SWITCH })

export const reset = () => ({ type: audioPlayerConstants.AUDIO_CHANGE_RESET })
