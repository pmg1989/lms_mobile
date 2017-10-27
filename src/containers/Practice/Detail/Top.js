import React from 'react'
import styles from './Top.less'

const Top = () => {
  return (
    <div className={styles.top_box}>
      <div className={styles.top}>
        <div className={styles.thumbs}>
          <img src={'/images/course-type/piano-big.png'} alt="" />
        </div>
        <div className={styles.text}>
          <span className={styles.title}>第1课： 哈哈哈哈</span><br />
          <span>新流行和声键盘</span><br />
          <span>第三阶段（上）离调</span>
        </div>
      </div>
      <div className={styles.des}>
        <span>课程要点说明课程要点说明课程要点说明课程要点说明课程要点说明课程要点说明课程要点说明课程要点说明课程要点课程要点说明课程要点说明。</span>
      </div>
    </div>
  )
}

export default Top
