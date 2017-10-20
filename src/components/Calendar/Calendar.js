import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import Immutable from 'immutable'
import classnames from 'classnames'
import moment from 'moment'
import { Icon } from 'components'
import styles from './Calendar.less'

class Calendar extends Component {
  static propTypes = {

  }

  state = {
    monthDays: moment().endOf('month'),
    monthName: moment().format('YYYY / MM'),
    dateList: [],
  }

  componentWillMount () {
    const { monthDays } = this.state
    const dates = []
    const start = (monthDays.date(1).weekday() + 1) % 7
    const end = monthDays.add(1, 'M').date(0).date()
    console.log(monthDays.format('YYYY-MM-DD'), start, end)
    for (let i = 0; i < start; i += 1) {
      dates.push('')
    }
    for (let i = 0; i < end; i += 1) {
      dates.push(i + 1)
    }
    const padRight = 7 - (dates.length % 7)
    for (let i = 0; i < padRight; i += 1) {
      dates.push('')
    }
    this.setState({ dateList: dates })
  }

  render () {
    const { monthName, dateList } = this.state

    return (
      <div className={styles.cal_box}>
        <div className={styles.top_box}>
          <div className={classnames(styles.item, styles.left)}>
            <Icon type={require('svg/arrow-left-light.svg')} />
          </div>
          <div className={classnames(styles.item, styles.center)}>
            {monthName}
          </div>
          <div className={classnames(styles.item, styles.right)}>
            <Icon className={classnames(styles.right_icon)} type={require('svg/arrow-left.svg')} />
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.header}>
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
          </div>
          <div className={styles.body}>
            {dateList.map((item, key) => {
              return (
                <span key={key}>{item}</span>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar
