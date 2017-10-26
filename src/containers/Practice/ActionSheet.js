import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { Icon, LinkToken } from 'components'
import styles from './List.less'

const ActionSheet = ({ idnumber, list, show, onClose }) => {
  return (
    <div className={classnames(styles.action_sheet_box, show && styles.active)} onClick={onClose}>
      <ul className={styles.list}>
        {list.map((item, key) => {
          return (
            <li key={key}>
              <LinkToken to={`/practice/${idnumber}/${item.get('index')}`}>
                <div className={styles.left}>
                  <span>{item.get('name')}</span>
                </div>
                <Icon type={require('svg/enter.svg')} />
              </LinkToken>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

ActionSheet.propTypes = {
  idnumber: PropTypes.string.isRequired,
  list: PropTypes.instanceOf(Immutable.List).isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ActionSheet
