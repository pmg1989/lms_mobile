import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { AUDIO_CHANGE_INDEX, AUDIO_CHANGE_PLAY, AUDIO_CHANGE_PAUSE, AUDIO_CHANGE_PREV, AUDIO_CHANGE_NEXT, AUDIO_CHANGE_SWITCH } from 'constants/home-constants'

const $audioPlayer = Immutable.fromJS({
  list: [{
    title: '测试音频文件1',
    author: 'felix1',
    thumb: 'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg',
    source: 'https://ompdghfd0.qnssl.com/lms_stagingsz01/recording/student/jl/1980-145-1499755427.mp3?e=1521860480&token=fl6A1F9KHk0raN9TIv9kr4mZRnd1KovppmqGTET_:GBWNR_1_34Fqs5wFgoqkfrsZZW0=',
  }, {
    title: '时间都去哪了',
    author: 'felix2',
    thumb: 'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg',
    source: 'https://o9u2lnvze.qnssl.com/music/songs/uhsAAJfW61DnhdgU-0d9493b8-3e01-48f3-b0fb-60901a32eec6',
  }, {
    title: '爱如潮水',
    author: 'felix3',
    thumb: 'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg',
    source: 'https://ompdghfd0.qnssl.com/lms_stagingsz01/recording/student/jl/1980-145-1499755427.mp3?e=1522055089&token=fl6A1F9KHk0raN9TIv9kr4mZRnd1KovppmqGTET_:5vK-QEKGPbXxQ5K_p5qxs5_tGMk=',
  }],
  index: 0,
  playing: false,
  switching: false, // 切换状态
})

const audioPlayer = createReducer($audioPlayer, {
  [AUDIO_CHANGE_INDEX] (state, action) {
    return state.set('index', action.index).set('playing', false).set('switching', true)
  },
  [AUDIO_CHANGE_PLAY] (state) {
    return state.set('playing', true).set('switching', false)
  },
  [AUDIO_CHANGE_PAUSE] (state) {
    return state.set('playing', false).set('switching', false)
  },
  [AUDIO_CHANGE_PREV] (state) {
    const size = state.get('list').size
    const cur = state.get('index') - 1
    return state.set('index', cur < 0 ? size - 1 : cur).set('playing', false).set('switching', true)
  },
  [AUDIO_CHANGE_NEXT] (state) {
    const size = state.get('list').size
    const cur = state.get('index') + 1
    return state.set('index', cur % size).set('playing', false).set('switching', true)
  },
  [AUDIO_CHANGE_SWITCH] (state) {
    return state.set('switching', !state.get('switching')).set('playing', false)
  },
})

export default audioPlayer
