import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import moment from 'moment'
import { Icon, LinkToken, Empty } from 'components'
import { renderBgImage } from 'utils/tools'
import styles from './CourseList.less'

const now = new Date().getTime()

const TitleBanner = ({ title, image, status, freezeStatus }) => {
  const dic = {
    0: { css: 'start', text: '待开课' },
    2: { css: 'end', text: '已结课' },
  }

  const dicFreeze = {
    FREEZING: '即将冻结',
    FROZEN: '已冻结',
    NORMAL: '', // 正常，但不显示
  }
  const freezeLabel = dicFreeze[freezeStatus]

  return (
    <div className={styles.title_image_box} style={renderBgImage(image)}>
      <span>{title}{freezeLabel && `(${freezeLabel})`}</span>
      {status !== 1 && <span className={classnames(styles.tips, styles[dic[status].css])}>{dic[status].text}</span>}
    </div>
  )
}
TitleBanner.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  freezeStatus: PropTypes.string.isRequired,
}

const PFCourse = ({ status, item }) => {
  const currentAvailable = item.get('current_lesson_available')
  const hasNext = !!currentAvailable
  const isBeginning = hasNext && (currentAvailable - (now / 1000) < 60 * 60 * 24)
  const categoryId = item.get('category_idnumber')
  const isVip = categoryId.includes('-vip-')
  const linkTo = `/progress/${encodeURIComponent(item.get('contractid'))}/${categoryId}?type=profession&proCategoryId=${item.get('category_idnumber')}`

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <span className={styles.title}>专业课</span>
        <span className={styles.content}>
          {status === 0 && '待开课'}
          {status === 1 && !hasNext && '下节课 未预约'}
          {status === 1 && hasNext &&
            <span>
              下节课 {moment.unix(currentAvailable).format('YYYY-MM-DD HH:mm')}{isBeginning && '（即将开课）'}
            </span>
          }
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
  const currentAvailable = item.get('current_lesson_available')
  const hasNext = !!currentAvailable
  const isBeginning = hasNext && (currentAvailable - (now / 1000) < 60 * 60 * 24)
  const categoryId = 'hd'
  const linkTo = `/progress/${encodeURIComponent(item.get('hdid'))}/${categoryId}?type=hd&proCategoryId=${item.get('category_idnumber')}`

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <span className={styles.title}>互动课</span>
        <span className={styles.content}>
          {status === 0 && '待开课'}
          {status === 1 && !hasNext && '下节课 未预约'}
          {status === 1 && hasNext &&
            <span>
              下节课 {moment.unix(currentAvailable).format('YYYY-MM-DD HH:mm')}{isBeginning && '（即将开课）'}（{item.get('current_lesson_summary')}）
            </span>
          }
          {status === 2 && '已结课'}
        </span>
      </div>
      <div className={styles.right}>
        <span>已完成 · {item.get('attended_lesson_cnt')} / {item.get('constract_lesson_cnt')}</span>
        {status === 1 && <span><LinkToken className={classnames(styles.btn, styles.btn_blue)} to={linkTo}>预约</LinkToken></span>}
        {status === 2 && <span><LinkToken className={styles.btn} to={linkTo}>查看</LinkToken></span>}
      </div>
    </div>
  )
}
HDCourse.propTypes = {
  status: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
}

const JLCourse = ({ status, item }) => {
  const currentAvailable = item.get('current_lesson_available')
  const hasNext = !!currentAvailable
  const isBeginning = hasNext && (currentAvailable - (now / 1000) < 60 * 60 * 24)
  const categoryId = item.get('jl_category_idnumber')
  const linkTo = `/progress/${encodeURIComponent(item.get('jlid'))}/${categoryId}?type=jl&proCategoryId=${item.get('category_idnumber')}`

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <span className={styles.title}>交流课</span>
        <span className={styles.content}>
          {status === 0 && '待开课'}
          {status === 1 && !hasNext && '下节课 未预约'}
          {status === 1 && hasNext &&
            <span>
              下节课 {moment.unix(currentAvailable).format('YYYY-MM-DD HH:mm')}{isBeginning && '（即将开课）'}
            </span>
          }
          {status === 2 && '已结课'}
        </span>
      </div>
      <div className={styles.right}>
        <span>已完成 · {item.get('attended_lesson_cnt')} / {item.get('constract_lesson_cnt')}</span>
        {status === 1 && <span><LinkToken className={classnames(styles.btn, styles.btn_blue)} to={linkTo}>预约</LinkToken></span>}
        {status === 2 && <span><LinkToken className={styles.btn} to={linkTo}>查看</LinkToken></span>}
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
        const categoryId = (item.getIn(['profession', 'category_idnumber']) || '').split('-')[0]

        return (
          <div key={key} className={styles.list}>
            <TitleBanner title={item.getIn(['profession', 'category_summary'])} status={status} freezeStatus={item.getIn(['profession', 'contract_status'])} image={`./images/course-type/${categoryId}.png`} />
            <PFCourse status={status} item={item.get('profession')} />
            {item.getIn(['hd', 'hdid']) && <HDCourse type={'hd'} title="互动课" status={status} item={item.get('hd')} />}
            {item.getIn(['jl', 'jlid']) && <JLCourse type={'jl'} title="交流课" status={status} item={item.get('jl')} />}
            {status === 1 &&
              <div className={styles.btn_box}>
                <LinkToken className={styles.btn} to={`/practice/${item.getIn(['profession', 'category_idnumber'])}`}>
                  <Icon className={styles.icon} type={require('svg/microphone.svg')} /> 课后练习
                </LinkToken>
              </div>
            }
          </div>
        )
      })}
      {list.isEmpty() &&
        <div className={styles.list}>
          <Empty type="music">
            <span>暂无课程</span>
          </Empty>
        </div>
      }
    </div>
  )
}
CourseList.propTypes = {
  status: PropTypes.number.isRequired,
  list: PropTypes.instanceOf(Immutable.List).isRequired,
}

export default CourseList
