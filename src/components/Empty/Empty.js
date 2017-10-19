import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from 'components'
import styles from './Empty.less'

const Empty = ({ type, className, children }) => {
  return (
    <div className={classnames(styles.empty_box, className || '')}>
      {type === 'nomal' &&
      <Icon className={styles.icon} type={require('svg/empty.svg')} />
      }
      {type === 'music' &&
      <Icon className={styles.icon} type={require('svg/empty-music.svg')} />
      }
      <div className={styles.text}>
        {children || '暂无数据'}
      </div>
    </div>
  )
}

Empty.defaultProps = {
  type: 'nomal',
}

Empty.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
}

export default Empty
