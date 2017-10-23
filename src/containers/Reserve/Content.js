import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { browserHistory } from 'react-router'
import { Toast } from 'antd-mobile'
import { Calendar, Icon } from 'components'
import styles from './Content.less'

const TimeSelect = ({ lessons, onChange }) => {
  return (
    <div className={styles.date_select}>
      <Icon type={require('svg/complete.svg')} />
      <span className={styles.center}>选择时间</span>
      <select className={styles.selected} onChange={onChange}>
        {lessons.map((item, key) => {
          return (
            <option key={key} value={JSON.stringify(item.toJS())}>
              {item.get('label')}
            </option>
          )
        })}
      </select>
    </div>
  )
}
TimeSelect.propTypes = {
  lessons: PropTypes.instanceOf(Immutable.List).isRequired,
  onChange: PropTypes.func.isRequired,
}

class Content extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    dayOfLessons: PropTypes.instanceOf(Immutable.Map).isRequired,
    info: PropTypes.instanceOf(Immutable.Map).isRequired,
    submitReserve: PropTypes.func.isRequired,
  }

  state = {
    lessons: Immutable.fromJS([]),
    curLesson: {},
  }

  submit () {
    const { curLesson: { lessonId } } = this.state
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
    const { dayOfLessons, info, params: { categoryId } } = this.props
    const { lessons, curLesson } = this.state
    const showTips = categoryId.startsWith('hd-') || categoryId.startsWith('jl-')

    const calendarProps = {
      fillDates: dayOfLessons,
      onChange: (month, day) => {
        const lessonList = dayOfLessons.getIn([month, day])
        this.setState({
          lessons: lessonList,
          curLesson: lessonList.get(0).toJS(),
        })
      },
    }

    const timeSelectProps = {
      lessons,
      onChange: (e) => {
        this.setState({ curLesson: JSON.parse(e.target.value) })
      },
    }

    return (
      <div className={styles.box}>
        <div className={styles.title}>预约第{info.get('attendedlesson_cnt')}课</div>
        <Calendar {...calendarProps} />
        <TimeSelect {...timeSelectProps} />
        {!!curLesson.lower_limit && showTips &&
          <div className={styles.tips}>
            已约课<span>{curLesson.num_student}</span>人 至少{curLesson.lower_limit}人开课
          </div>
        }
        <div className={styles.btn} onClick={::this.submit}>预约</div>
      </div>
    )
  }
}

export default Content
