import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import moment from 'moment'
import { Modal } from 'antd-mobile'
import { Icon, LinkToken } from 'components'
import styles from './Content.less'

const alert = Modal.alert

const Content = ({ category, lessons }) => {
  const hasLessions = lessons.size > 0
  const isVip = category.includes('-vip-')

  const handleCancel = () => {
    alert(
      <span className={styles.modal_title}>取消预定课程</span>,
      <div>
        <span>键盘VIP第一阶段(上)</span><br /><span>2016-11-20 10:00</span>
      </div>,
      [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => console.log('ok') },
      ],
    )
  }

  return (
    <div className={styles.list_box}>
      <ul className={styles.list}>
        {lessons.map((item, key) => {
          const LinkToReview = (
            <LinkToken to={`/review/${item.get('id')}`} className={classnames(styles.btn, styles.border, styles.blue)}>查看评语</LinkToken>
          )

          const dicAcronym = {
            E: {
              Link: <span className={classnames(styles.btn, styles.leave)}>请假</span>,
              Icon: <Icon type={require('svg/status_absent.svg')} />,
            }, // 请假 leave
            A: {
              Link: <span className={classnames(styles.btn, styles.undo)}>缺席</span>,
              Icon: <Icon type={require('svg/status_absent.svg')} />,
            }, // 缺席
            P: {
              Link: LinkToReview,
              Icon: <Icon type={require('svg/status_present.svg')} />,
            }, // 出席
            L: {
              Link: LinkToReview,
              Icon: <Icon type={require('svg/status_present.svg')} />,
            }, // 迟到 late
            O: {
              Link: LinkToReview,
              Icon: <Icon type={require('svg/status_present.svg')} />,
            }, // 上过课但教师尚未考勤
            '': {
              Link: (
                <span className={classnames(styles.btn, styles.border)} onClick={handleCancel}>
                  取消预约
                </span>
              ),
              Icon: <Icon type={require('svg/status_acronym.svg')} />,
            },
          }
          console.log(item.get('acronym'))
          return (
            <li key={key}>
              <div className={styles.left}>
                {dicAcronym[item.get('acronym')].Icon}
                <span className={styles.title}>
                  {moment.unix(item.get('available')).format('MM-DD HH:mm YYYY')}
                </span>
              </div>
              <div className={styles.right}>
                {dicAcronym[item.get('acronym')].Link}
                {/* <span className={styles.btn}>即将开课</span>
                  <span className={classnames(styles.btn, styles.border)} onClick={handleCancel}>
                    取消预约
                  </span>
                  <span className={classnames(styles.btn, styles.undo)}>缺席</span>
                  <span className={classnames(styles.btn, styles.border, styles.blue)} onClick={handleCancel}>
                    查看评语
                  </span>
                */}
              </div>
            </li>
          )
        })}
        {!hasLessions &&
        <li>
          <div className={styles.empty}>{isVip ?
            <span>快点击右上角，预约上课吧</span> : <span>正在排课中，<br />如需帮助请联系服务专员</span>}
          </div>
        </li>
        }
      </ul>
    </div>
  )
}

Content.propTypes = {
  category: PropTypes.string.isRequired,
  lessons: PropTypes.instanceOf(Immutable.List).isRequired,
}

export default Content
