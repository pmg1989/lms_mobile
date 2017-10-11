import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import moment from 'moment'
import { Link } from 'react-router'
import { Icon } from 'components'
import styles from './CourseList.less'

export const Title = ({ title }) => (
  <div className={styles.title_box}>
    <span className={styles.title}>{title}</span>
  </div>
)
Title.propTypes = {
  title: PropTypes.string.isRequired,
}

const TitleBanner = ({ title, image, status }) => {
  const dic = {
    0: { css: 'start', text: '待开课' },
    2: { css: 'end', text: '已节课' },
  }

  return (
    <div className={styles.title_image_box} style={{
      background: `url('${image}') no-repeat center center`,
      backgroundSize: 'cover' }}
    >
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

const Course = ({ title, status, item }) => {
  const hasNext = !!item.get('current_lesson_available')
  const isVip = item.get('category_idnumber').includes('-vip-')
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <span className={styles.title}>{title}</span>
        <span className={styles.content}>
          {status === 0 && '待开课'}
          {status === 1 && !hasNext && '下节课 未预约'}
          {status === 1 && hasNext && `下节课 ${moment.unix(item.get('current_lesson_available')).format('YYYY-MM-DD HH:mm')} (即将开课)`}
          {status === 2 && '已结课'}
        </span>
      </div>
      <div className={styles.right}>
        <span>已完成 · {item.get('attended_lesson_cnt')} / {item.get('constract_lesson_cnt')}</span>
        {status !== 0 && !isVip && <span><Link className={styles.btn} to={'/introduce'}>查看</Link></span>}
        {status !== 0 && isVip && <span><Link className={classnames(styles.btn, styles.btn_blue)} to={'/introduce'}>预约</Link></span>}
      </div>
    </div>
  )
}
Course.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
}

const CourseList = ({ title, status, list }) => {
  return (
    <div className={styles.list_box}>
      <Title title={title} />
      {list.map((item, key) => {
        return (
          <div key={key} className={styles.list}>
            <TitleBanner title={item.getIn(['profession', 'category_summary'])} status={status} image="https://o9u2lnvze.qnssl.com/upload/599f44feb33e6ef97b00efc2cea28e41.png?1495444468" />
            <Course title="专业课" status={status} item={item.get('profession')} />
            {item.getIn(['hd', 'hdid']) && <Course title="互动课" status={status} item={item.get('hd')} />}
            {item.getIn(['jl', 'jlid']) && <Course title="交流课" status={status} item={item.get('jl')} />}
            {status !== 0 &&
              <div className={styles.btn_box}>
                <Link className={styles.btn} to={'/demo/123/456?name=felix&token=abc'}>
                  <Icon className={styles.icon} type={require('svg/cry.svg')} /> 练习歌曲
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
  title: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  list: PropTypes.instanceOf(Immutable.List).isRequired,
}

export default CourseList
