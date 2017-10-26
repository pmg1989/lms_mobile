import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Icon, Empty } from 'components'
import styles from './List.less'

const ThumbTitle = ({ cover, title, stage }) => (
  <li className={styles.avatar_box}>
    <img className={styles.thumb} src={cover} alt={title} />
    <div className={styles.text}>
      <span className={styles.title}>{title}</span><br />
      <span>{stage}</span>
    </div>
  </li>
)

ThumbTitle.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
}

const List = ({ limit, list, info }) => {
  console.log(info)
  return (
    <div className={styles.list_box}>
      <ul className={styles.list}>
        { !!limit && <ThumbTitle {...info} />}
        {list.map((item, key) => {
          if (!!limit && key >= limit) {
            return false
          }
          return (
            <li key={key}>
              <div className={styles.left}>
                <span>{item.get('name')}</span>
              </div>
              <Icon type={require('svg/enter.svg')} />
            </li>
          )
        })}
        {!!limit &&
          <li>
            <div className={styles.more}>预览全部（共5课）</div>
          </li>
        }
        {list.isEmpty() &&
          <li>
            <Empty type="music">暂无练习</Empty>
          </li>
        }
      </ul>
    </div>
  )
}

List.propTypes = {
  limit: PropTypes.number.isRequired,
  list: PropTypes.instanceOf(Immutable.List).isRequired,
  info: PropTypes.object,
}

export default List
