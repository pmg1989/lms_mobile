import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Popover } from 'antd-mobile'
import { Icon, LinkToken } from 'components'
import styles from './Bottom.less'

const Item = Popover.Item

const Bottom = () => {
  const popoverProps = {
    visible: true,
    placement: 'top',
    overlayClassName: styles.feedback_box,
    align: { offset: [20, -10] },
    overlay: [<Item key="1" value="tips">有课程未反馈</Item>],
  }

  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <Popover {...popoverProps}>
          <Icon type={require('svg/feedback.svg')} />
        </Popover>
        <span>我的反馈</span>
      </div>
      <div className={styles.right}>
        <LinkToken className={styles.btn} to={'/demo/123/456?name=felix&token=abc'}>
          预约课程
        </LinkToken>
        <LinkToken className={classnames(styles.btn, styles.orange)} to={'/demo/123/456?name=felix&token=abc'}>
          预约瑜伽课
        </LinkToken>
      </div>
    </div>

  )
}

export default Bottom
