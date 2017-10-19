import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'components'
import styles from './Empty.less'

const Empty = ({ type, children }) => {
  return (
    <div className={styles.empty_box}>
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
  children: PropTypes.any.isRequired,
}

export default Empty
