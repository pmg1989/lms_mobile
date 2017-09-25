import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Icon, AudioPlayer } from 'components'
import { Title } from './StudyList'
import styles from './RecordList.less'

const RecordList = ({ list, index, playing }) => {
  const audioPlayerProps = {
    list: list.toJS(),
    index,
    playing,
  }

  return (
    <div>
      <div className={styles.list_box}>
        <Title title="我的录音作品" />
        <ul className={styles.list}>
          {list.map((item, key) => (
            <li className={styles.item} key={key}>
              <div className={styles.left}>
                <span>{list.size - key}</span><span className={styles.title}>{item.get('title')}</span>
              </div>
              <div className={styles.opt_box}>
                {key === index && playing ? <Icon type={require('svg/pause.svg')} /> : <Icon type={require('svg/play.svg')} />}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {playing && <AudioPlayer {...audioPlayerProps} />}
    </div>
  )
}

RecordList.propTypes = {
  list: PropTypes.instanceOf(Immutable.List).isRequired,
  index: PropTypes.number.isRequired,
  playing: PropTypes.bool.isRequired,
}

export default RecordList
