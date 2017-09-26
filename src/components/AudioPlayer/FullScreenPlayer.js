import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from 'components'
import { renderBgImage } from 'utils/tools'
import styles from './FullScreenPlayer.less'

const FullScreenPlayer = ({
  title, thumb, author, playing, loop, isFullScreen,
  hideFullScreen, handleLoop, handlePlayPause, handlePrev, handleNext }) => {
  return (
    <div className={classnames(styles.full_screen_box, isFullScreen && styles.active)}>
      <div className={styles.back} onClick={hideFullScreen}>
        <Icon type={require('svg/arrow-down.svg')} />
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span><br />
        <span className={styles.author}>{author}</span>
      </div>
      <div className={styles.image_bg} style={renderBgImage(thumb)} />
      <div className={styles.opt_box}>
        {loop ?
          <Icon onClick={handleLoop} type={require('svg/loop.svg')} /> :
          <Icon onClick={handleLoop} type={require('svg/loop-no.svg')} />
        }
        <Icon type={require('svg/prev.svg')} onClick={handlePrev} />
        {playing ?
          <Icon className={styles.pause_o} onClick={handlePlayPause} type={require('svg/pause-o.svg')} /> :
          <Icon className={styles.play_o} onClick={handlePlayPause} type={require('svg/play-o.svg')} />
        }
        <Icon type={require('svg/next.svg')} onClick={handleNext} />
        <Icon type={require('svg/share.svg')} />
      </div>
    </div>
  )
}

FullScreenPlayer.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  loop: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  hideFullScreen: PropTypes.func.isRequired,
  handleLoop: PropTypes.func.isRequired,
  handlePlayPause: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
}

export default FullScreenPlayer
