import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
// import moment from 'moment'
// import styles from './Content.less'

const Content = ({ dayOfLessons, info }) => {
  console.log(dayOfLessons, info)
  return (
    <div>content</div>
  )
}

Content.propTypes = {
  dayOfLessons: PropTypes.instanceOf(Immutable.Map).isRequired,
  info: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default Content
