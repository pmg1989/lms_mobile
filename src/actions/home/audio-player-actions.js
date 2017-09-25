import { AUDIO_SWITCH_INDEX, AUDIO_SWITCH_PLAYING } from 'constants/home-constants'

export const changeIndex = index => ({ index, type: AUDIO_SWITCH_INDEX })

export const changePlaying = playing => ({ playing, type: AUDIO_SWITCH_PLAYING })
