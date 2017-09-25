import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'components'
import { renderBgImage } from 'utils/tools'
import styles from './FullScreenPlayer.less'

class FullScreenPlayer extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    // url: PropTypes.string.isRequired,
  }

  state = {
    play: true,
    loop: true,
  }

  handleLoop () {
    this.setState(prevState => ({ loop: !prevState.loop }))
  }

  handlePlayPause () {
    this.setState(prevState => ({ play: !prevState.play }))
  }

  render () {
    const { title, thumb, author } = this.props
    const { play, loop } = this.state

    return (
      <div className={styles.full_screen_box}>
        <div className={styles.back}>
          <Icon type={require('svg/arrow-down.svg')} />
        </div>
        <div className={styles.info}>
          <span className={styles.title}>{title}</span><br />
          <span className={styles.author}>{author}</span>
        </div>
        <div className={styles.image_bg} style={renderBgImage(thumb)} />
        <div className={styles.opt_box}>
          {loop ?
            <Icon onClick={::this.handleLoop} type={require('svg/loop.svg')} /> :
            <Icon onClick={::this.handleLoop} type={require('svg/loop-no.svg')} />
          }
          <Icon type={require('svg/prev.svg')} />
          {play ?
            <Icon className={styles.pause_o} onClick={::this.handlePlayPause} type={require('svg/pause-o.svg')} /> :
            <Icon className={styles.play_o} onClick={::this.handlePlayPause} type={require('svg/play-o.svg')} />
          }
          <Icon type={require('svg/next.svg')} />
          <Icon type={require('svg/share.svg')} />
        </div>
      </div>
    )
  }
}

export default FullScreenPlayer
