import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { Icon } from 'components'
import styles from './List.less'

const ActionSheet = ({ list }) => {
  return (
    <div className={classnames(styles.action_sheet_box, styles.active)}>
      <ul className={styles.list}>
        {list.map((item, key) => {
          return (
            <li key={key}>
              <div className={styles.left}>
                <span>{item.get('name')}</span>
              </div>
              <Icon type={require('svg/enter.svg')} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

ActionSheet.propTypes = {
  list: PropTypes.instanceOf(Immutable.List).isRequired,
}

export default ActionSheet
