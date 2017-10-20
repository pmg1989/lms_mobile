import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
// import { Picker } from 'antd-mobile'
import { Calendar, Icon } from 'components'
import styles from './Content.less'

const DateSelect = () => {
  return (
    <div className={styles.date_select}>
      <Icon type={require('svg/complete.svg')} />
      <span className={styles.center}>选择时间</span>
      <Icon type={require('svg/arrow-down.svg')} />
    </div>
  )
}

const Content = ({ dayOfLessons, info }) => {
  const calendarProps = {
    fillDates: dayOfLessons,
    onChange (month, day) {
      console.log(dayOfLessons.getIn([month, day]))
    },
  }

  return (
    <div className={styles.box}>
      <div className={styles.title}>预约第{info.get('attendedlesson_cnt')}课</div>
      <Calendar {...calendarProps} />
      <DateSelect />
      <div className={styles.tips}>
        已约课<span>5</span>人 限30人
      </div>
      <div className={styles.btn}>预约</div>
    </div>
  )
}

Content.propTypes = {
  dayOfLessons: PropTypes.instanceOf(Immutable.Map).isRequired,
  info: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default Content
