import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { AUDIO_CHANGE_INDEX, AUDIO_CHANGE_PLAYING, AUDIO_CHANGE_PREV, AUDIO_CHANGE_NEXT } from 'constants/home-constants'

const $audioPlayer = Immutable.fromJS({
  list: [{
    title: '时间都去哪了',
    author: 'felix1',
    thumb: 'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg',
    source: 'https://o9u2lnvze.qnssl.com/music/songs/uhsAAJfW61DnhdgU-0d9493b8-3e01-48f3-b0fb-60901a32eec6',
  }, {
    title: '测试音频文件2',
    author: 'felix2',
    thumb: 'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg',
    source: 'https://ompdghfd0.qnssl.com/lms_stagingsz01/recording/student/jl/1980-145-1499755427.mp3?e=1521860480&token=fl6A1F9KHk0raN9TIv9kr4mZRnd1KovppmqGTET_:GBWNR_1_34Fqs5wFgoqkfrsZZW0=',
  }, {
    title: '爱如潮水',
    author: 'felix3',
    thumb: 'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg',
    source: 'https://o9u2lnvze.qnssl.com/FnAsnwL0e3ex-doU_0iCttbP0zIh',
  }],
  index: 0,
  playing: false,
})

const audioPlayer = createReducer($audioPlayer, {
  [AUDIO_CHANGE_INDEX] (state, action) {
    return state.set('index', action.index).set('playing', true)
  },
  [AUDIO_CHANGE_PLAYING] (state) {
    return state.set('playing', !state.get('playing'))
  },
  [AUDIO_CHANGE_PREV] (state) {
    const size = state.get('list').size
    const cur = state.get('index') - 1
    return state.set('index', cur < 0 ? size - 1 : cur).set('playing', true)
  },
  [AUDIO_CHANGE_NEXT] (state) {
    const size = state.get('list').size
    const cur = state.get('index') + 1
    return state.set('index', cur % size).set('playing', true)
  },
})

export default audioPlayer
