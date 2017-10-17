import React from 'react'
// import PropTypes from 'prop-types'
// import Immutable from 'immutable'
import classnames from 'classnames'
import moment from 'moment'
import { Icon, LinkToken } from 'components'
import styles from '../Progress/Content.less'

const Content = () => {
  return (
    <div className={classnames(styles.list_box, styles.feedback_box)}>
      <ul className={styles.list}>
        <li>
          <div className={styles.left}>
            <Icon type={require('svg/status_absent.svg')} />
            <span className={styles.title}>
              {moment().format('MM-DD HH:mm YYYY')}
            </span>
          </div>
          <div className={styles.right}>
            <LinkToken to={'/feedback/1'} className={classnames(styles.btn, styles.border, styles.leave)}>
              课后反馈
            </LinkToken>
            {/*
              <span className={classnames(styles.btn, styles.undo)}>反馈超时</span>
              <span className={classnames(styles.btn, styles.border)}>
                查看反馈
              </span>
            */}
          </div>
        </li>
        <li>
          <div className={styles.empty}>
            <span>~~你还没有课程反馈哦~~</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

Content.propTypes = {
  // user: PropTypes.object.isRequired,
  // category: PropTypes.string.isRequired,
  // lessons: PropTypes.instanceOf(Immutable.List).isRequired,
  // onProgress: PropTypes.object.isRequired,
}

export default Content
