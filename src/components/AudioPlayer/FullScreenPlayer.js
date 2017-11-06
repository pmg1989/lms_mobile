import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { Slider } from 'antd-mobile'
import { Icon } from 'components'
import { parseTime } from 'utils/tools'
import zhugeio from 'utils/zhugeio'
import { isApp, tools } from 'utils/app'
import styles from './FullScreenPlayer.less'

class FullScreenPlayer extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    current: PropTypes.instanceOf(Immutable.Map).isRequired,
    loop: PropTypes.bool.isRequired,
    playing: PropTypes.bool.isRequired,
    switching: PropTypes.bool.isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    hideFullScreen: PropTypes.func.isRequired,
    handleLoop: PropTypes.func.isRequired,
    handlePlayPause: PropTypes.func.isRequired,
    handlePrev: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleSwitch: PropTypes.func.isRequired,
    setAudioElement: PropTypes.func.isRequired,
    resetAudio: PropTypes.func.isRequired,
    share: PropTypes.bool.isRequired,
  }

  state = {
    isSliding: false,
    currentTime: 0,
    totalTime: 0,
    percent: 0,
  }

  componentDidMount () {
    const { $audio } = this

    $audio.addEventListener('canplay', this.onCanplay)
    $audio.addEventListener('loadstart', this.onLoadstart)
    $audio.addEventListener('ended', this.onDnded)
    $audio.addEventListener('timeupdate', this.onTimeupdate)
  }

  componentWillUnmount () {
    const { $audio } = this
    this.props.resetAudio()

    $audio.removeEventListener('canplay', this.onCanplay)
    $audio.removeEventListener('loadstart', this.onLoadstart)
    $audio.removeEventListener('ended', this.onDnded)
    $audio.removeEventListener('timeupdate', this.onTimeupdate)
  }

  onCanplay = (e) => {
    !this.props.playing && this.$audio.pause()
    this.setState({ totalTime: e.target.duration })
  }

  onLoadstart = () => {
    setTimeout(() => { this.props.switching && this.props.handlePlayPause() }, 250)
  }

  onDnded = () => {
    if (this.props.loop) {
      this.props.handleSwitch()
      setTimeout(() => { this.props.handlePlayPause() }, 0)
      zhugeio.loopAudioPlayer({
        title: this.props.current.get('title'),
        type: this.props.type === 'practice' ? '练习曲' : '录音',
      })
    } else {
      this.props.handleNext()
    }
  }

  onTimeupdate = (e) => {
    const { currentTime, duration } = e.target
    if (!this.state.isSliding && !isNaN(duration)) {
      this.setState({ currentTime, percent: (currentTime / duration) * 100 })
    }
  }

  handleShare () {
    const { current } = this.props
    const params = {
      title: current.get('title'),
      description: '我录了一首歌曲。',
      image: current.get('thumb'),
      url: `${location.origin}/share/record?title=${encodeURIComponent(current.get('title'))}&author=${encodeURIComponent(current.get('author'))}&image=${encodeURIComponent(current.get('thumb'))}&source=${encodeURIComponent(current.get('source'))}`,
    }
    zhugeio.share(params.title, current.get('author'))
    tools.share(params)
  }

  render () {
    const {
      current, playing, loop, isFullScreen, share,
      setAudioElement, hideFullScreen, handleLoop, handlePlayPause, handlePrev, handleNext } = this.props

    const { currentTime, totalTime, percent } = this.state

    const slideProps = {
      step: 0.1,
      value: percent,
      onChange: (per) => {
        this.setState({ percent: per, isSliding: true, currentTime: (percent * totalTime) / 100 })
      },
      onAfterChange: (per) => {
        this.setState({ isSliding: false })
        this.$audio.currentTime = this.$audio.duration * (per / 100)
      },
      trackStyle: {
        backgroundColor: '#00CD23',
        height: '3px',
      },
      railStyle: {
        backgroundColor: '#cfcbd0',
        height: '3px',
      },
      handleStyle: {
        borderColor: '#00CD23',
        height: '16px',
        width: '16px',
        marginLeft: '-7px',
        marginTop: '-7px',
        backgroundColor: '#00CD23',
        boxShadow: '0 0 1px 1px #00CD23',
      },
    }

    const audioProps = {
      autoPlay: 'autoplay',
      src: current.get('source'),
      ref: (c) => {
        this.$audio = c
        setAudioElement(c)
      },
    }

    return (
      <div className={classnames(styles.full_screen_box, isFullScreen && styles.active)}>
        <div className={styles.top_box}>
          <div className={styles.back} onClick={hideFullScreen}>
            <Icon type={require('svg/arrow-down.svg')} />
          </div>
          <div className={styles.info}>
            <span className={styles.title}>{current.get('title')}</span><br />
            <span className={styles.author}>{current.get('author')}</span>
          </div>
        </div>
        <div className={styles.image_bg}>
          <img src={current.get('thumb')} alt="thumb" />
        </div>
        <div className={styles.bottom_box}>
          <div className={styles.slider_box}>
            <span className={styles.curtime}>{parseTime(currentTime)}</span>
            <Slider {...slideProps} />
            <span className={styles.duration}>{parseTime(totalTime)}</span>
          </div>
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
            {isApp() && share && <Icon onClick={::this.handleShare} type={require('svg/share.svg')} />}
          </div>
        </div>
        <audio {...audioProps}>audio not supported :(</audio>
      </div>
    )
  }
}

export default FullScreenPlayer
