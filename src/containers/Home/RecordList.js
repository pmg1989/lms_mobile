import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { Icon, AudioPlayer } from 'components'
import { Title } from './StudyList'
import styles from './RecordList.less'

const RecordList = ({ list, index, playing, onAudioPlayer }) => {
  let $audio

  const audioPlayerProps = {
    list: list.toJS(),
    index,
    playing,
    onAudioPlayer,
    setAudioElement ($el) {
      $audio = $el
    },
  }

  const handlePlayPause = (cur) => {
    if (index === cur) {
      onAudioPlayer.changePlaying()
      playing ? $audio.pause() : $audio.play()
    } else if (cur === index - 1) {
      onAudioPlayer.toPrev()
    } else if (cur === index + 1) {
      onAudioPlayer.toNext()
    } else {
      onAudioPlayer.changeIndex(cur)
    }
  }

  return (
    <div>
      <div className={classnames(styles.list_box, playing && styles.playing)}>
        <Title title="我的录音作品" />
        <ul className={styles.list}>
          {list.map((item, key) => (
            <li className={styles.item} key={key}>
              <div className={styles.left}>
                <span>{list.size - key}</span><span className={styles.title}>{item.get('title')}</span>
              </div>
              <div className={styles.opt_box}>
                {key === index && playing ?
                  <Icon type={require('svg/pause.svg')} onClick={() => handlePlayPause(key)} /> :
                  <Icon type={require('svg/play.svg')} onClick={() => handlePlayPause(key)} />
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
  list: PropTypes.instanceOf(Immutable.List).isRequired,
  index: PropTypes.number.isRequired,
  playing: PropTypes.bool.isRequired,
  onAudioPlayer: PropTypes.object.isRequired,
}

export default RecordList
