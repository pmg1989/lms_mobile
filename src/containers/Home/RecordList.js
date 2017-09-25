import React from 'react'
import { Icon, AudioPlayer } from 'components'
import { Title } from './StudyList'
import styles from './RecordList.less'

const RecordList = () => {
  const list = [{
    title: '测试音频文件1测试音频文件1测试音频',
    author: 'felix1',
    thumb: 'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg',
    source: 'https://o9u2lnvze.qnssl.com/music/songs/uhsAAJfW61DnhdgU-0d9493b8-3e01-48f3-b0fb-60901a32eec6',
  }, {
    title: '测试音频文件2',
    author: 'felix2',
    thumb: 'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg',
    source: 'https://ompdghfd0.qnssl.com/lms_stagingsz01/recording/student/jl/1980-145-1499755427.mp3?e=1521860480&token=fl6A1F9KHk0raN9TIv9kr4mZRnd1KovppmqGTET_:GBWNR_1_34Fqs5wFgoqkfrsZZW0=',
  }, {
    title: '测试音频文件3',
    author: 'felix3',
    thumb: 'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg',
    source: 'https://o9u2lnvze.qnssl.com/music/songs/uhsAAJfW61DnhdgU-0d9493b8-3e01-48f3-b0fb-60901a32eec6',
  }]

  const audioPlayerProps = {
    list,
    index: 0,
  }

  return (
    <div>
      <div className={styles.list_box}>
        <Title title="我的录音作品" />
        <ul className={styles.list}>
          {list.map((item, key) => (
            <li className={styles.item} key={key}>
              <div className={styles.left}>
                <span>{list.length - key}</span><span className={styles.title}>{item.title}</span>
              </div>
              <div className={styles.play}>
                <Icon type={require('svg/play.svg')} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <AudioPlayer {...audioPlayerProps} />
    </div>
  )
}

export default RecordList
