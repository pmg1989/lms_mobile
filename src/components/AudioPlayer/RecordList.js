import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { Icon, SoundWave } from 'components'
import AudioPlayer from './AudioPlayer'
import styles from './RecordList.less'

const Title = ({ title }) => (
  <div className={styles.title_box}>
    <span className={styles.title}>{title}</span>
  </div>
)
Title.propTypes = {
  title: PropTypes.string.isRequired,
}

const RecordList = ({ type, audioPlayer, onAudioPlayer, onPracticeDetail }) => {
  let $audio
  const list = audioPlayer.get('list')
  const index = audioPlayer.get('index')
  const playing = audioPlayer.get('playing')
  const switching = audioPlayer.get('switching')

  const audioPlayerProps = {
    type,
    audioPlayer,
    onAudioPlayer,
    share: type === 'record',
    setAudioElement ($el) {
      $audio = $el
    },
  }

  const handlePlayPause = (cur) => {
    if (index === cur) {
      playing ? onAudioPlayer.changePause() : onAudioPlayer.changePlay()
      playing ? $audio.pause() : $audio.play()
    } else {
      if (cur === index - 1) {
        onAudioPlayer.toPrev()
      } else if (cur === index + 1) {
        onAudioPlayer.toNext()
      } else {
        onAudioPlayer.changeIndex(cur)
      }
      $audio.play()
    }
    if (type === 'practice') {
      onPracticeDetail.addPracticeHistory(list.getIn([cur, 'author']))
    }
  }

  return (
    <div>
      <div className={classnames(styles.list_box, (playing || switching) && styles.playing)}>
        {type === 'record' && <Title title="我的录音作品" />}
        <ul className={styles.list}>
          {list.map((item, key) => (
            <li className={styles.item} key={key} onClick={() => handlePlayPause(key)}>
              <div className={styles.left}>
                <SoundWave show={key === index && playing} /><span className={styles.title}>{item.get('title')}</span>
              </div>
              <div className={styles.opt_box}>
                {key === index && playing ?
                  <Icon className={styles.pause} type={require('svg/pause.svg')} /> :
                  <Icon className={styles.play} type={require('svg/play.svg')} />
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
      <AudioPlayer {...audioPlayerProps} />
    </div>
  )
}

RecordList.propTypes = {
  type: PropTypes.string.isRequired,
  audioPlayer: PropTypes.instanceOf(Immutable.Map).isRequired,
  onAudioPlayer: PropTypes.object.isRequired,
  onPracticeDetail: PropTypes.object,
}

export default RecordList
