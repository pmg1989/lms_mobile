import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Calendar } from 'components'
// import moment from 'moment'
import styles from './Content.less'

const Content = ({ dayOfLessons, info }) => {
  console.log(dayOfLessons, info)
  const calendarProps = {
    fillDates: dayOfLessons,
    onChange (month, day) {
      console.log(dayOfLessons.getIn([month, day]))
    },
  }
  return (
    <div className={styles.box}>
      <div className={styles.title}>预约第一课</div>
      <Calendar {...calendarProps} />
    </div>
  )
}

Content.propTypes = {
  dayOfLessons: PropTypes.instanceOf(Immutable.Map).isRequired,
  info: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default Content
