import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { Toast } from 'antd-mobile'
import { Calendar, Icon } from 'components'
import Confirm from './Confirm'
import styles from './Content.less'

const TimeSelect = ({ lessons, onChange }) => {
  return (
    <div className={styles.date_select}>
      <Icon type={require('svg/select-time.svg')} />
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
    onReserve: PropTypes.object.isRequired,
  }

  state = {
    lessons: Immutable.fromJS([]),
    curLesson: Immutable.fromJS({}),
    showModal: false,
  }

  submit () {
    const { curLesson } = this.state
    if (this.props.dayOfLessons.isEmpty()) {
      Toast.info('没有可预约的课程!')
    } else if (!curLesson.get('lessonId')) {
      Toast.info('请先选择预约的日期/时间!')
    } else {
      this.setState({ showModal: true })
    }
  }

  render () {
    const { dayOfLessons, info, params, onReserve } = this.props
    const { lessons, curLesson, showModal } = this.state
    const showTips = params.categoryId.startsWith('hd-') || params.categoryId.startsWith('jl-')

    const calendarProps = {
      fillDates: dayOfLessons,
      onChange: (month, day) => {
        const lessonList = dayOfLessons.getIn([month, day])
        this.setState({
          lessons: lessonList,
          curLesson: lessonList.get(0),
        })
      },
    }

    const timeSelectProps = {
      lessons,
      onChange: (e) => {
        this.setState({ curLesson: Immutable.fromJS(JSON.parse(e.target.value)) })
      },
    }

    const confirmProps = {
      visible: showModal,
      params,
      categorySummary: info.get('category_summary'),
      curLesson,
      onReserve,
      onClose: () => {
        this.setState({ showModal: false })
      },
    }

    return (
      <div className={styles.box}>
        <div className={styles.title}>预约第{info.get('enrolledlesson_cnt') && (info.get('enrolledlesson_cnt') + 1)}课</div>
        <Calendar {...calendarProps} />
        <TimeSelect {...timeSelectProps} />
        {!!curLesson.get('lower_limit') && showTips &&
          <div className={styles.tips}>
          已约课<span>{curLesson.get('num_student')}</span>人 至少{curLesson.get('lower_limit')}人开课
          </div>
        }
        <div className={classnames(styles.btn, dayOfLessons.isEmpty() && styles.disabled)} onClick={::this.submit}>预约</div>
        <Confirm {...confirmProps} />
      </div>
    )
  }
}

export default Content
