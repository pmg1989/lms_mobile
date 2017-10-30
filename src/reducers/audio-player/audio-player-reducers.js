import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { audioPlayerConstants } from 'constants'

const $audioPlayer = Immutable.fromJS({
  list: [],
  index: 0,
  playing: false,
  switching: false, // 切换状态
})

const audioPlayer = createReducer($audioPlayer, {
  [audioPlayerConstants.FETCH_RECORD_LIST] (state, action) {
    return state.set('list', action.list)
  },
  [audioPlayerConstants.AUDIO_CHANGE_INDEX] (state, action) {
    return state.set('index', action.index).set('playing', false).set('switching', true)
  },
  [audioPlayerConstants.AUDIO_CHANGE_PLAY] (state) {
    return state.set('playing', true).set('switching', false)
  },
  [audioPlayerConstants.AUDIO_CHANGE_PAUSE] (state) {
    return state.set('playing', false).set('switching', false)
  },
  [audioPlayerConstants.AUDIO_CHANGE_PREV] (state) {
    const size = state.get('list').size
    const cur = state.get('index') - 1
    return state.set('index', cur < 0 ? size - 1 : cur).set('playing', false).set('switching', true)
  },
  [audioPlayerConstants.AUDIO_CHANGE_NEXT] (state) {
    const size = state.get('list').size
    const cur = state.get('index') + 1
    return state.set('index', cur % size).set('playing', false).set('switching', true)
  },
  [audioPlayerConstants.AUDIO_CHANGE_SWITCH] (state) {
    return state.set('switching', !state.get('switching')).set('playing', false)
  },
  [audioPlayerConstants.AUDIO_CHANGE_RESET] () {
    return $audioPlayer
  },
})

export default audioPlayer
