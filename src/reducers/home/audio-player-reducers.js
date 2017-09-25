import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { AUDIO_SWITCH_INDEX, AUDIO_SWITCH_PLAYING } from 'constants/home-constants'

const $list = Immutable.fromJS([{
  title: '测试音频文件1测试音频文件1测试音频',
  author: 'felix1',
  thumb: 'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg',
  source: 'https://o9u2lnvze.qnssl.com/music/songs/uhsAAJfW61DnhdgU-0d9493b8-3e01-48f3-b0fb-60901a32eec6',
}, {
  title: '测试音频文件2',
  author: 'felix2',
  thumb: 'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg',
  source: 'https://ompdghfd0.qnssl.com/lms_stagingsz01/recording/student/jl/1980-145-1499755427.mp3?e=1521860480&token=fl6A1F9KHk0raN9TIv9kr4mZRnd1KovppmqGTET_:GBWNR_1_34Fqs5wFgoqkfrsZZW0=',
}, {
  title: '测试音频文件3',
  author: 'felix3',
  thumb: 'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg',
  source: 'https://o9u2lnvze.qnssl.com/music/songs/uhsAAJfW61DnhdgU-0d9493b8-3e01-48f3-b0fb-60901a32eec6',
}])

const list = createReducer($list, {

})

const index = createReducer(0, {
  [AUDIO_SWITCH_INDEX] (state, action) {
    return action.index
  },
})

const playing = createReducer(false, {
  [AUDIO_SWITCH_PLAYING] (state, action) {
    return action.playing
  },
})

export default combineReducers({
  list,
  index,
  playing,
})
