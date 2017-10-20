import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import moment from 'moment'
import { Icon } from 'components'
import styles from './Calendar.less'

class Calendar extends Component {
  static propTypes = {
    fillDates: PropTypes.instanceOf(Immutable.Map).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    dateList: [],
    curMonth: moment().format('YYYY / MM'),
    selectedDay: 0,
    fillDates: Immutable.fromJS({}),
    prevStatus: false,
    nextStatus: true,
  }

  componentWillMount () {
    this.renderDateList()
  }

  componentWillReceiveProps (nextProps) {
    if (!Immutable.is(this.props.fillDates, nextProps.fillDates)) {
      this.setState({ fillDates: nextProps.fillDates }, () => {
        this.renderDateList()
      })
    }
  }

  handlePreMonth () {
    const { prevStatus, curMonth } = this.state
    prevStatus && this.setState({
      curMonth: moment(curMonth, 'YYYY-MM').subtract(1, 'M').format('YYYY / MM'),
    }, () => {
      this.renderDateList()
    })
  }

  handleNextMonth () {
    const { nextStatus, curMonth } = this.state
    nextStatus && this.setState({
      curMonth: moment(curMonth, 'YYYY-MM').add(1, 'M').format('YYYY / MM'),
    }, () => {
      this.renderDateList()
    })
  }

  handleChange = (day, curDays) => () => {
    if (curDays) {
      this.setState({ selectedDay: day })
      this.props.onChange(this.state.curMonth, day)
    }
  }

  renderDateList () {
    const { curMonth, fillDates } = this.state
    const dates = []
    const start = (moment(curMonth, 'YYYY-MM').date(1).weekday() + 1) % 7
    const end = moment(curMonth, 'YYYY-MM').daysInMonth()

    for (let i = 0; i < start; i += 1) {
      dates.push('')
    }
    for (let i = 0; i < end; i += 1) {
      dates.push((i + 1).toString())
    }
    if (dates.length % 7 > 0) {
      const padRight = 7 - (dates.length % 7)
      for (let i = 0; i < padRight; i += 1) {
        dates.push('')
      }
    }
    const prevMonth = moment(curMonth, 'YYYY-MM').subtract(1, 'M').format('YYYY / MM')
    const nextMonth = moment(curMonth, 'YYYY-MM').add(1, 'M').format('YYYY / MM')
    this.setState({
      dateList: dates,
      prevStatus: fillDates && !!fillDates.get(prevMonth),
      nextStatus: fillDates && !!fillDates.get(nextMonth),
    })
  }

  render () {
    const { curMonth, dateList, fillDates, selectedDay, prevStatus, nextStatus } = this.state

    const dicDates = fillDates.get(curMonth)

    return (
      <div className={styles.cal_box}>
        <div className={styles.top_box}>
          <div className={classnames(styles.item, styles.left)}>
            <Icon onClick={::this.handlePreMonth} type={prevStatus ? require('svg/arrow-left.svg') : require('svg/arrow-left-light.svg')} />
          </div>
          <div className={classnames(styles.item, styles.center)}>
            {curMonth}
          </div>
          <div className={classnames(styles.item, styles.right)}>
            <Icon onClick={::this.handleNextMonth} className={classnames(styles.right_icon)} type={nextStatus ? require('svg/arrow-left.svg') : require('svg/arrow-left-light.svg')} />
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
              const curDays = dicDates && dicDates.get(`${item}`)
              return (
                <span key={key} className={classnames(!!curDays && styles.enable, selectedDay === item && styles.active)} onClick={::this.handleChange(item, curDays)}>{item}</span>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar
