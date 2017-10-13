import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import moment from 'moment'
import { Modal } from 'antd-mobile'
import { Icon, LinkToken } from 'components'
import styles from './Content.less'

const alert = Modal.alert

const now = new Date()

const Content = ({ user: { userid, rolename }, category, lessons, onProgress }) => {
  const hasLessions = lessons.size > 0
  const isVip = category.includes('-vip-')

  const handleCancel = (title, available, lessonid, index) => {
    alert(
      <span className={styles.modal_title}>取消预定课程</span>,
      <div>
        <span>{title}</span><br /><span>{moment.unix(available).format('YYYY-MM-DD HH:mm')}</span>
      </div>,
      [
        { text: '取消' },
        {
          text: '确定',
          onPress: () => {
            onProgress.receiveCancelLession(index)
            console.log(userid, rolename);
            // onProgress.cancelLession(lessonid, userid, rolename, index)
          },
        },
      ],
    )
  }

  return (
    <div className={styles.list_box}>
      <ul className={styles.list}>
        {lessons.map((item, key) => {
          const available = item.get('available')
          const isCancel = available - (now.getTime() / 1000) > 60 * 60 * 24

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
              Icon: <Icon type={require('svg/status_occured.svg')} />,
            }, // 上过课但教师尚未考勤
            '': {
              Link: (
                <span>
                  {moment.unix(available).isAfter(new Date()) && isCancel &&
                    <span className={classnames(styles.btn, styles.border)} onClick={() => handleCancel(item.get('category_summary'), available, item.get('id'), key)}>
                      取消预约
                    </span>
                  }
                  {moment.unix(available).isAfter(new Date()) && !isCancel &&
                    <span className={styles.btn}>即将开课</span>
                  }
                </span>
              ),
              Icon: <Icon type={require('svg/status_acronym.svg')} />,
            },
          }

          return (
            <li key={key}>
              <div className={styles.left}>
                {dicAcronym[item.get('acronym')].Icon}
                <span className={styles.title}>
                  {moment.unix(available).format('MM-DD HH:mm YYYY')}
                </span>
              </div>
              <div className={styles.right}>
                {dicAcronym[item.get('acronym')].Link}
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
  user: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  lessons: PropTypes.instanceOf(Immutable.List).isRequired,
  onProgress: PropTypes.object.isRequired,
}

export default Content
