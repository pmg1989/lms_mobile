import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Icon, Empty } from 'components'
import styles from './List.less'

const ThumbTitle = ({ thumb, title, des }) => (
  <li className={styles.avatar_box}>
    <img className={styles.thumb} src={thumb} alt={title} />
    <div className={styles.text}>
      <span className={styles.title}>{title}</span><br />
      <span>{des}</span>
    </div>
  </li>
)

ThumbTitle.propTypes = {
  thumb: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  des: PropTypes.string.isRequired,
}

const List = ({ limit, list }) => {
  return (
    <div className={styles.list_box}>
      <ul className={styles.list}>
        { !!limit && <ThumbTitle thumb="/images/course-type/composition-big.png" title="新流行和声键盘" des="第三阶段（上）离调" />}
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
        {list.isEmpty() &&
          <li>
            <Empty type="music">暂无练习</Empty>
          </li>
        }
        {!!limit &&
          <li>
            <div className={styles.more}>预览全部（共5课）</div>
          </li>
        }
      </ul>
    </div>
  )
}

List.propTypes = {
  limit: PropTypes.number.isRequired,
  list: PropTypes.instanceOf(Immutable.List).isRequired,
}

export default List
