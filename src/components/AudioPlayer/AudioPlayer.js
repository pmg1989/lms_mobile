import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from 'components'
import { renderBgImage } from 'utils/tools'
import FullScreenPlayer from './FullScreenPlayer'
import styles from './AudioPlayer.less'

class AudioPlayer extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
    })),
    index: PropTypes.number.isRequired,
    playing: PropTypes.bool.isRequired,
    switching: PropTypes.bool.isRequired,
    onAudioPlayer: PropTypes.object.isRequired,
    setAudioElement: PropTypes.func,
  }

  state = {
    loop: false,
    isFullScreen: false,
  }

  handleLoop () {
    this.setState(prevState => ({ loop: !prevState.loop }))
  }

  handlePlayPause () {
    const { onAudioPlayer, playing } = this.props
    playing ? onAudioPlayer.changePause() : onAudioPlayer.changePlay()
    playing ? this.$audio.pause() : this.$audio.play()
  }

  handleNext () {
    const { onAudioPlayer } = this.props
    onAudioPlayer.toNext()
  }

  handleShowFullScreen () {
    this.setState({ isFullScreen: true })
  }

  render () {
    const { list, index, playing, switching, setAudioElement, onAudioPlayer } = this.props
    const { loop, isFullScreen } = this.state
    const current = list[index]

    const fullScreenPlayerProps = {
      current,
      loop,
      playing,
      switching,
      isFullScreen,
      handleLoop: ::this.handleLoop,
      handlePlayPause: ::this.handlePlayPause,
      handleNext: ::this.handleNext,
      handlePrev: () => {
        onAudioPlayer.toPrev()
      },
      handleSwitch: () => {
        onAudioPlayer.changeSwitching()
      },
      hideFullScreen: () => {
        this.setState({ isFullScreen: false })
      },
      setAudioElement: ($el) => {
        this.$audio = $el
        setAudioElement($el)
      },
    }

    return (
      <div className={styles.player_box}>
        <div className={classnames(styles.bottom_box, (playing || switching) && styles.active)} onClick={::this.handleShowFullScreen}>
          <div className={styles.left}>
            <div className={styles.thumb} style={renderBgImage(current.thumb)} />
            <div className={styles.info}>
              <span className={styles.title}>{current.title}</span>
              <span className={styles.author}>{current.author}</span>
            </div>
          </div>
          <div className={styles.right} onClick={(e) => { e.stopPropagation() }}>
            {loop ? <Icon onClick={::this.handleLoop} type={require('svg/loop.svg')} /> : <Icon onClick={::this.handleLoop} type={require('svg/loop-no.svg')} />}
            {playing ? <Icon onClick={::this.handlePlayPause} type={require('svg/pause.svg')} /> : <Icon onClick={::this.handlePlayPause} type={require('svg/play.svg')} />}
            <Icon type={require('svg/next.svg')} onClick={::this.handleNext} />
          </div>
        </div>
        <FullScreenPlayer {...fullScreenPlayerProps} />
      </div>
    )
  }
}

export default AudioPlayer
