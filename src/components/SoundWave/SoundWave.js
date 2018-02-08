import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './SoundWave.less'

const SoundWave = ({ show }) => {
  return (
    <div className={classnames(styles.loading, show && styles.show)}>
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

SoundWave.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default SoundWave
