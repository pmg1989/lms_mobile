import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import moment from 'moment'
import { Modal, Toast } from 'antd-mobile'
import { Icon, LinkToken, Empty } from 'components'
import zhugeio from 'utils/zhugeio'
import styles from './Content.less'

const alert = Modal.alert

const now = new Date()

const Content = ({ type, user: { userid, rolename }, category, lessons, onProgress }) => {
  const isVip = category.includes('-vip-')
  const lessonsCount = lessons.size
  const disabledCancel = type === 'profession' && !isVip // 专业课非VIP课程，不能取消预约

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
            onProgress.cancelLession(lessonid, userid, rolename, index).then(() => {
              Toast.info('您已成功取消预定课程！')
              zhugeio.cancelReserve({
                categorySummary: title,
                dates: moment.unix(available).format('YYYY-MM-DD HH:mm'),
                categoryId: category,
              })
            })
          },
        },
      ],
    )
    document.querySelector('.am-modal').classList.remove('am-modal-android') // fix platform for android
  }

  return (
    <div className={styles.list_box}>
      <ul className={styles.list}>
        {lessons.map((item, key) => {
          const available = item.get('available')
          const isCancel = available - (now.getTime() / 1000) > 60 * 60 * 24
          const afterNow = moment.unix(available).isAfter(now)

          const LinkToReview = type === 'profession' && <LinkToken to={`/review/${item.get('id')}?curLesson=${lessonsCount - key}`} className={classnames(styles.btn, styles.underline)}>查看评语</LinkToken>

          const dicAcronym = {
            E: {
              Link: <span className={classnames(styles.btn, styles.absent)}>请假</span>,
              Icon: <Icon type={require('svg/status_absent.svg')} />,
            }, // 请假 leave
            A: {
              Link: <span className={classnames(styles.btn, styles.absent)}>缺席</span>,
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
                  {afterNow && isCancel &&
                    <span>
                      {disabledCancel &&
                        <span className={classnames(styles.btn, styles.disabled)}>
                          等待开课
                        </span>
                      }
                      {!disabledCancel &&
                        <span className={classnames(styles.btn, styles.border, styles.blue)} onClick={() => handleCancel(item.get('category_summary'), available, item.get('id'), key)}>
                          取消预约
                        </span>
                      }
                    </span>
                  }
                  {afterNow && !isCancel &&
                    <span className={classnames(styles.btn, styles.disabled)}>即将开课</span>
                  }
                </span>
              ), // 未上课未考勤
              Icon: (
                <span>
                  {afterNow && isCancel &&
                    <Icon type={disabledCancel ? require('svg/status_acronym_ing.svg') : require('svg/status_acronym.svg')} />
                  }
                  {afterNow && !isCancel &&
                    <Icon type={require('svg/status_acronym_ing.svg')} />
                  }
                </span>
              ),
            },
          }

          return (
            <li key={key}>
              <div className={styles.left}>
                {dicAcronym[item.get('acronym')].Icon}
                <div className={styles.title_box}>
                  <span>第{lessonsCount - key}课{type === 'hd' && `（${item.get('category')}课）`}</span> <br />
                  <span className={styles.gray}>{moment.unix(available).format('MM-DD HH:mm')}</span>
                </div>
              </div>
              <div className={styles.right}>
                {dicAcronym[item.get('acronym')].Link}
              </div>
            </li>
          )
        })}
        {lessons.isEmpty() &&
        <li>
          <Empty type="music">{isVip ?
            <span>快点预约课程按钮，预约上课吧</span> : <span>正在排课中，<br />如需帮助请联系服务专员</span>}
          </Empty>
        </li>
        }
      </ul>
    </div>
  )
}

Content.propTypes = {
  type: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  lessons: PropTypes.instanceOf(Immutable.List).isRequired,
  onProgress: PropTypes.object.isRequired,
}

export default Content
