import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { Icon } from 'components'
import zhugeio from 'utils/zhugeio'
import { renderBgImage } from 'utils/tools'
import FullScreenPlayer from './FullScreenPlayer'
import styles from './AudioPlayer.less'

class AudioPlayer extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    audioPlayer: PropTypes.instanceOf(Immutable.Map).isRequired,
    onAudioPlayer: PropTypes.object.isRequired,
    setAudioElement: PropTypes.func,
    share: PropTypes.bool,
  }

  static defaultProps = {
    share: true,
  }

  state = {
    loop: false,
    isFullScreen: false,
    loading: true,
  }

  componentDidMount () {
    const { $audio } = this
    $audio.addEventListener('canplay', () => {
      this.setState({ loading: false })
    })
  }

  componentWillReceiveProps (nextProps) {
    const { audioPlayer } = this.props
    if (!audioPlayer.get('switching') && nextProps.audioPlayer.get('switching')) {
      this.setState({ loading: true })
    }
  }

  handleLoop () {
    this.setState(prevState => ({ loop: !prevState.loop }))
  }

  handlePlayPause () {
    const { onAudioPlayer, audioPlayer } = this.props
    const playing = audioPlayer.get('playing')
    playing ? onAudioPlayer.changePause() : onAudioPlayer.changePlay()
    playing ? this.$audio.pause() : this.$audio.play()
  }

  handleNext () {
    const { onAudioPlayer } = this.props
    onAudioPlayer.toNext()
  }

  handleShowFullScreen () {
    this.setState({ isFullScreen: true })
    document.body.style.overflow = 'hidden'

    const { type, audioPlayer } = this.props
    const list = audioPlayer.get('list')
    const index = audioPlayer.get('index')
    const current = list.get(index)
    zhugeio.showAudioPlayerFullScreen({
      title: current.get('title'),
      type: type === 'practice' ? '练习曲' : '录音',
    })
  }

  render () {
    const { type, audioPlayer, setAudioElement, onAudioPlayer, share } = this.props
    const { loop, isFullScreen, loading } = this.state
    const list = audioPlayer.get('list')
    const index = audioPlayer.get('index')
    const playing = audioPlayer.get('playing')
    const switching = audioPlayer.get('switching')
    const current = list.get(index) || Immutable.fromJS({})
    const fullScreenPlayerProps = {
      type,
      share,
      current,
      loop,
      playing,
      switching,
      isFullScreen,
      handleLoop: ::this.handleLoop,
      handlePlayPause: ::this.handlePlayPause,
      handleNext: ::this.handleNext,
      resetAudio: onAudioPlayer.reset,
      handlePrev: onAudioPlayer.toPrev,
      handleSwitch: onAudioPlayer.changeSwitching,
      hideFullScreen: () => {
        this.setState({ isFullScreen: false })
        document.body.removeAttribute('style')
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
            <div className={styles.thumb} style={renderBgImage(current.get('thumb'))}>
              {loading && <Icon className={styles.loading} type={require('svg/loading.svg')} />}
            </div>
            <div className={styles.info}>
              <span className={styles.title}>{current.get('title')}</span>
              <span className={styles.author}>{current.get('author')}</span>
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
