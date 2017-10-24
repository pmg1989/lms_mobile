import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import moment from 'moment'
import { Icon, LinkToken, Empty } from 'components'
import styles from '../Progress/Content.less'

const Content = ({ lessons }) => {

  return (
    <div className={classnames(styles.list_box, styles.feedback_box)}>
      <ul className={styles.list}>
        {lessons.map((item, key) => {
          const dicAcronym = {
            E: {
              Icon: <Icon type={require('svg/status_absent.svg')} />,
            }, // 请假 leave
            A: {
              Icon: <Icon type={require('svg/status_absent.svg')} />,
            }, // 缺席
            P: {
              Icon: <Icon type={require('svg/status_present.svg')} />,
            }, // 出席
            L: {
              Icon: <Icon type={require('svg/status_present.svg')} />,
            }, // 迟到 late
            O: {
              Icon: <Icon type={require('svg/status_occured.svg')} />,
            }, // 上过课但教师尚未考勤
            '': {
              Icon: <Icon type={require('svg/status_acronym.svg')} />,
            },
          }

          const submitTime = item.get('submittime')
          const id = item.get('id')

          return (
            <li key={key}>
              <div className={styles.left}>
                {dicAcronym[item.get('acronym')].Icon}
                <span className={styles.title}>
                  {moment.unix(item.get('available')).format('MM-DD HH:mm YYYY')}
                </span>
              </div>
              <div className={styles.right}>
                {!submitTime &&
                  <LinkToken to={`/feedback/${id}?type=add`} className={classnames(styles.btn, styles.border, styles.leave)}>
                    课后反馈
                  </LinkToken>
                }
                {submitTime &&
                  <LinkToken to={`/feedback/${id}`} className={classnames(styles.btn, styles.border)}>
                    查看反馈
                  </LinkToken>
                }
              </div>
            </li>
          )
        })}
        {lessons.isEmpty() &&
        <li>
          <Empty>
            暂无反馈
          </Empty>
        </li>
        }
      </ul>
    </div>
  )
}

Content.propTypes = {
  lessons: PropTypes.instanceOf(Immutable.List).isRequired,
}

export default Content
