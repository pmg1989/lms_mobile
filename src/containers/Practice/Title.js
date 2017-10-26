import React from 'react'
import PropTypes from 'prop-types'
import styles from './Title.less'

const Title = ({ title }) => (
  <div className={styles.title_box}>
    <span className={styles.title}>{title}</span>
  </div>
)

Title.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Title
