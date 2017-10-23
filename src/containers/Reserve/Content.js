import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { browserHistory } from 'react-router'
import { Toast } from 'antd-mobile'
import { Calendar, Icon } from 'components'
import styles from './Content.less'

class Content extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    dayOfLessons: PropTypes.instanceOf(Immutable.Map).isRequired,
    info: PropTypes.instanceOf(Immutable.Map).isRequired,
    submitReserve: PropTypes.func.isRequired,
  }

  state = {
    lessons: Immutable.fromJS([]),
  }

  submit () {
    const lessonId = this.time.value
    if (!lessonId) {
      Toast.info('请先选择预约的日期/时间！')
    } else {
      const { params: { contractId, categoryId }, submitReserve } = this.props
      submitReserve(lessonId, contractId, categoryId).then(({ status, message }) => {
        if (status === 10000) {
          Toast.info('预约成功！', 2, () => {
            browserHistory.goBack()
          })
        } else {
          Toast.info(message)
        }
      })
    }
  }

  render () {
    const { dayOfLessons, info } = this.props
    const { lessons } = this.state

    const calendarProps = {
      fillDates: dayOfLessons,
      onChange: (month, day) => {
        this.setState({ lessons: dayOfLessons.getIn([month, day]) })
      },
    }

    return (
      <div className={styles.box}>
        <div className={styles.title}>预约第{info.get('attendedlesson_cnt')}课</div>
        <Calendar {...calendarProps} />
        <div className={styles.date_select}>
          <Icon type={require('svg/complete.svg')} />
          <span className={styles.center}>选择时间</span>
          <select className={styles.selected} ref={(c) => { this.time = c }}>
            {lessons.map((item, key) => {
              return (
                <option key={key} value={item.get('lessonId')}>{item.get('label')}</option>
              )
            })}
          </select>
        </div>
        <div className={styles.tips}>
          已约课<span>5</span>人 限30人
        </div>
        <div className={styles.btn} onClick={::this.submit}>预约</div>
      </div>
    )
  }
}

export default Content
