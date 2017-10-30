import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Icon, LinkToken } from 'components'
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

const List = ({ limit, list, info, onChangeActionSheet }) => {
  const handleChangeCurLessons = () => {
    onChangeActionSheet(list, info.idnumber)
  }

  return (
    <div className={styles.list_box}>
      <ul className={styles.list}>
        { !!limit && <ThumbTitle {...info} />}
        {list.map((item, key) => {
          const idnumber = info ? info.idnumber : item.get('idnumber')
          if (!!limit && key >= limit) {
            return false
          }
          return (
            <li key={key}>
              <LinkToken to={`/practice/${idnumber}/${item.get('index')}`}>
                <div className={styles.left}>
                  {item.get('name')}
                </div>
                <Icon type={require('svg/enter.svg')} />
              </LinkToken>
            </li>
          )
        })}
        {!!limit &&
          <li onClick={handleChangeCurLessons}>
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
  info: PropTypes.object,
  onChangeActionSheet: PropTypes.func,
}

export default List
