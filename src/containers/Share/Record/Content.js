import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Slider } from 'antd-mobile'
import { Icon } from 'components'
import { wx } from 'utils/wechat'
import { parseTime } from 'utils/tools'
import styles from './Content.less'

class Content extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
  }

  state = {
    playing: true,
    isSliding: false,
    currentTime: 0,
    totalTime: 0,
    percent: 0,
  }

  componentDidMount () {
    const { $audio } = this

    $audio.addEventListener('canplay', this.onCanplay)
    $audio.addEventListener('timeupdate', this.onTimeupdate)

    // fix by wechat ios autoPlay https://gist.github.com/ufologist/7c14837db642a6e916ce
    wx.ready(() => {
      $audio.play()
    })
  }

  componentWillUnmount () {
    const { $audio } = this
    $audio.removeEventListener('canplay', this.onCanplay)
    $audio.removeEventListener('timeupdate', this.onTimeupdate)
  }

  onCanplay = (e) => {
    this.setState({ totalTime: e.target.duration })
  }

  onTimeupdate = (e) => {
    const { currentTime, duration } = e.target
    if (!this.state.isSliding && !isNaN(duration)) {
      this.setState({ currentTime, percent: (currentTime / duration) * 100 })
    }
  }

  handlePlayPause = isPlaying => () => {
    this.setState({ playing: isPlaying })
    isPlaying ? this.$audio.play() : this.$audio.pause()
  }

  render () {
    const { query: { title, author, image, source } } = this.props
    const { playing, currentTime, totalTime, percent } = this.state

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
      src: source,
      ref: (c) => {
        this.$audio = c
      },
    }

    return (
      <div className={styles.box}>
        <div className={styles.top}>
          <span className={styles.title}>{title}</span><br />
          <span>{author}</span>
        </div>
        <div className={styles.bg}>
          <img src={image} alt="thumb" />
          {playing ?
            <Icon onClick={this.handlePlayPause(false)} className={classnames(styles.icon, styles.pause)} type={require('svg/pause-o.svg')} /> :
            <Icon onClick={this.handlePlayPause(true)} className={classnames(styles.icon, styles.play)} type={require('svg/play-o.svg')} />
          }
        </div>
        <div className={styles.slider_box}>
          <span className={styles.curtime}>{parseTime(currentTime)}</span>
          <Slider {...slideProps} />
          <span className={styles.duration}>{parseTime(totalTime)}</span>
        </div>
        <div className={styles.bottom}>
          <span className={styles.tips}>跟明星导师学音</span><br />
          <a className={styles.btn} href="http://E3nhATro.scene.eqxiu.cn/s/E3nhATro">想学唱歌点我</a>
        </div>
        <audio {...audioProps}>audio not supported :(</audio>
      </div>
    )
  }
}

export default Content
