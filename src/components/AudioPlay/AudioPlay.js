import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'components'
import styles from './AudioPlay.less'

class AudioPlay extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })),
    index: PropTypes.number.isRequired,
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
    const { list, index } = this.props
    const { play, loop } = this.state
    const current = list[index]

    return (
      <div className={styles.bottom_box}>
        <div className={styles.left}>
          <img className={styles.thumb} src={current.thumb} alt={current.title} />
          <div className={styles.info}>
            <span className={styles.title}>{current.title}</span>
            <span className={styles.author}>{current.author}</span>
          </div>
        </div>
        <div className={styles.right}>
          {loop ? <Icon onClick={::this.handleLoop} type={require('svg/loop.svg')} /> : <Icon onClick={::this.handleLoop} type={require('svg/loop-no.svg')} />}
          {play ? <Icon onClick={::this.handlePlayPause} type={require('svg/pause.svg')} /> : <Icon onClick={::this.handlePlayPause} type={require('svg/play.svg')} />}
          <Icon type={require('svg/next.svg')} />
        </div>
      </div>
    )
  }
}

export default AudioPlay
