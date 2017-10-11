import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { Icon, AudioPlayer } from 'components'
import styles from './RecordList.less'

const Title = ({ title }) => (
  <div className={styles.title_box}>
    <span className={styles.title}>{title}</span>
  </div>
)
Title.propTypes = {
  title: PropTypes.string.isRequired,
}

const RecordList = ({ list, index, playing, switching, onAudioPlayer }) => {
  let $audio

  const audioPlayerProps = {
    list: list.toJS(),
    index,
    playing,
    switching,
    onAudioPlayer,
    setAudioElement ($el) {
      $audio = $el
    },
  }

  const handlePlayPause = (cur) => {
    if (index === cur) {
      playing ? onAudioPlayer.changePause() : onAudioPlayer.changePlay()
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
      <div className={classnames(styles.list_box, (playing || switching) && styles.playing)}>
        <Title title="我的录音作品" />
        <ul className={styles.list}>
          {list.map((item, key) => (
            <li className={styles.item} key={key}>
              <div className={styles.left}>
                <span>{key + 1}</span><span className={styles.title}>{item.get('title')}</span>
              </div>
              <div className={styles.opt_box}>
                {key === index && playing ?
                  <Icon className={styles.pause} type={require('svg/pause.svg')} onClick={() => handlePlayPause(key)} /> :
                  <Icon className={styles.play} type={require('svg/play.svg')} onClick={() => handlePlayPause(key)} />
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
  switching: PropTypes.bool.isRequired,
  onAudioPlayer: PropTypes.object.isRequired,
}

export default RecordList
