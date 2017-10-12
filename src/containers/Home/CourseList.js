import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import moment from 'moment'
import { Link } from 'react-router'
import { Icon, LinkToken } from 'components'
import { renderBgImage } from 'utils/tools'
import styles from './CourseList.less'

const TitleBanner = ({ title, image, status }) => {
  const dic = {
    0: { css: 'start', text: '待开课' },
    2: { css: 'end', text: '已结课' },
  }

  return (
    <div className={styles.title_image_box} style={renderBgImage(image)}>
      <span>{title}</span>
      {status !== 1 && <span className={classnames(styles.tips, styles[dic[status].css])}>{dic[status].text}</span>}
    </div>
  )
}
TitleBanner.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
}

const PFCourse = ({ status, item }) => {
  const hasNext = !!item.get('current_lesson_available')
  const courseType = item.get('category_idnumber')
  const isVip = courseType.includes('-vip-')
  const linkTo = `/progress/${courseType}/${encodeURIComponent(item.get('contractid'))}`

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <span className={styles.title}>专业课</span>
        <span className={styles.content}>
          {status === 0 && '待开课'}
          {status === 1 && !hasNext && '下节课 未预约'}
          {status === 1 && hasNext &&
            <span>下节课 {moment.unix(item.get('current_lesson_available')).format('YYYY-MM-DD HH:mm')} (即将开课)</span>}
          {status === 2 && '已结课'}
        </span>
      </div>
      <div className={styles.right}>
        <span>已完成 · {item.get('attended_lesson_cnt')} / {item.get('constract_lesson_cnt')}</span>
        {status === 1 && isVip && <span><LinkToken className={classnames(styles.btn, styles.btn_blue)} to={linkTo}>预约</LinkToken></span>}
        {((status === 1 && !isVip) || status === 2) && <span><LinkToken className={styles.btn} to={linkTo}>查看</LinkToken></span>}
      </div>
    </div>
  )
}
PFCourse.propTypes = {
  status: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
}

const HDCourse = ({ status, item }) => {
  const hasNext = !!item.get('current_lesson_available')
  const courseType = item.get('category_idnumber')
  const isVip = courseType.includes('-vip-')
  const linkTo = `/progress/${courseType}/${encodeURIComponent(item.get('hdid'))}`

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <span className={styles.title}>互动课</span>
        <span className={styles.content}>
          {status === 0 && '待开课'}
          {status === 1 && !hasNext && '下节课 未预约'}
          {status === 1 && hasNext &&
            <span>下节课 {moment.unix(item.get('current_lesson_available')).format('YYYY-MM-DD HH:mm')} (即将开课)</span>}
          {status === 2 && '已结课'}
        </span>
      </div>
      <div className={styles.right}>
        <span>已完成 · {item.get('attended_lesson_cnt')} / {item.get('constract_lesson_cnt')}</span>
        {status === 1 && isVip && <span><LinkToken className={classnames(styles.btn, styles.btn_blue)} to={linkTo}>预约</LinkToken></span>}
        {((status === 1 && !isVip) || status === 2) && <span><LinkToken className={styles.btn} to={linkTo}>查看</LinkToken></span>}
      </div>
    </div>
  )
}
HDCourse.propTypes = {
  status: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
}

const JLCourse = ({ status, item }) => {
  const hasNext = !!item.get('current_lesson_available')
  const courseType = item.get('category_idnumber')
  const isVip = courseType.includes('-vip-')
  const linkTo = `/progress/${courseType}/${encodeURIComponent(item.get('jlid'))}`

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <span className={styles.title}>交流课</span>
        <span className={styles.content}>
          {status === 0 && '待开课'}
          {status === 1 && !hasNext && '下节课 未预约'}
          {status === 1 && hasNext &&
            <span>下节课 {moment.unix(item.get('current_lesson_available')).format('YYYY-MM-DD HH:mm')} (即将开课)</span>}
          {status === 2 && '已结课'}
        </span>
      </div>
      <div className={styles.right}>
        <span>已完成 · {item.get('attended_lesson_cnt')} / {item.get('constract_lesson_cnt')}</span>
        {status === 1 && isVip && <span><LinkToken className={classnames(styles.btn, styles.btn_blue)} to={linkTo}>预约</LinkToken></span>}
        {((status === 1 && !isVip) || status === 2) && <span><LinkToken className={styles.btn} to={linkTo}>查看</LinkToken></span>}
      </div>
    </div>
  )
}
JLCourse.propTypes = {
  status: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
}

const CourseList = ({ status, list }) => {
  return (
    <div className={styles.list_box}>
      {list.map((item, key) => {
        const courseType = (item.getIn(['profession', 'category_idnumber']) || '').split('-')[0]

        return (
          <div key={key} className={styles.list}>
            <TitleBanner title={item.getIn(['profession', 'category_summary'])} status={status} image={`./images/course-type/${courseType}.png`} />
            <PFCourse status={status} item={item.get('profession')} />
            {item.getIn(['hd', 'hdid']) && <HDCourse type={'hd'} title="互动课" status={status} item={item.get('hd')} />}
            {item.getIn(['jl', 'jlid']) && <JLCourse type={'jl'} title="交流课" status={status} item={item.get('jl')} />}
            {status !== 0 &&
              <div className={styles.btn_box}>
                <Link className={styles.btn} to={'/demo/123/456?name=felix&token=abc'}>
                  <Icon className={styles.icon} type={require('svg/microphone.svg')} /> 练习歌曲
                </Link>
              </div>
            }
          </div>
        )
      })}
    </div>
  )
}
CourseList.propTypes = {
  status: PropTypes.number.isRequired,
  list: PropTypes.instanceOf(Immutable.List).isRequired,
}

export default CourseList